// Deterministic response-quality checks for the psychometric test.
// Runs BEFORE the AI interpretation step so the AI knows whether to trust
// the numbers or warn the student/parent that retaking is recommended.

import { RIASEC_ITEMS, MI_ITEMS, type LikertItem, type AptitudeItem } from "./psychometricData";

export type QualityLevel = "high" | "medium" | "low";

export interface QualityReport {
  quality: QualityLevel;
  flags: string[];
  metrics: {
    riasecStraightLinePct: number;
    miStraightLinePct: number;
    riasecVariance: number;
    miVariance: number;
    riasecContradictions: number;
    miContradictions: number;
    aptitudeAnsweredPct: number;
    totalDurationSec?: number;
    avgSecPerItem?: number;
  };
}

function straightLinePct(items: LikertItem[], answers: Record<string, number>): number {
  if (items.length < 2) return 0;
  let same = 0;
  for (let i = 1; i < items.length; i++) {
    const a = answers[items[i].id];
    const b = answers[items[i - 1].id];
    if (a !== undefined && b !== undefined && a === b) same += 1;
  }
  return Math.round((same / (items.length - 1)) * 100);
}

function variance(items: LikertItem[], answers: Record<string, number>): number {
  const vals = items.map((it) => answers[it.id]).filter((v) => v !== undefined) as number[];
  if (vals.length === 0) return 0;
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const v = vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length;
  return Math.round(v * 100) / 100;
}

// Count pairs of items in the SAME category whose answers diverge by >= 3
// (e.g. one says "Strongly Agree" and another in the same trait says "Strongly Disagree").
function contradictions(items: LikertItem[], answers: Record<string, number>): number {
  const byCat: Record<string, number[]> = {};
  for (const it of items) {
    const v = answers[it.id];
    if (v === undefined) continue;
    (byCat[it.category] ??= []).push(v);
  }
  let count = 0;
  for (const arr of Object.values(byCat)) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (Math.abs(arr[i] - arr[j]) >= 3) count += 1;
      }
    }
  }
  return count;
}

export function assessResponseQuality(input: {
  riasec: Record<string, number>;
  mi: Record<string, number>;
  apt: Record<string, number>;
  aptItems: AptitudeItem[];
  startedAt?: number; // epoch ms
  finishedAt?: number; // epoch ms
}): QualityReport {
  const { riasec, mi, apt, aptItems, startedAt, finishedAt } = input;

  const riasecStraightLinePct = straightLinePct(RIASEC_ITEMS, riasec);
  const miStraightLinePct = straightLinePct(MI_ITEMS, mi);
  const riasecVariance = variance(RIASEC_ITEMS, riasec);
  const miVariance = variance(MI_ITEMS, mi);
  const riasecContradictions = contradictions(RIASEC_ITEMS, riasec);
  const miContradictions = contradictions(MI_ITEMS, mi);

  const aptAnswered = aptItems.filter((it) => apt[it.id] !== undefined).length;
  const aptitudeAnsweredPct = aptItems.length
    ? Math.round((aptAnswered / aptItems.length) * 100)
    : 0;

  const totalItems = RIASEC_ITEMS.length + MI_ITEMS.length + aptItems.length;
  const totalDurationSec =
    startedAt && finishedAt ? Math.max(0, Math.round((finishedAt - startedAt) / 1000)) : undefined;
  const avgSecPerItem =
    totalDurationSec !== undefined && totalItems > 0
      ? Math.round((totalDurationSec / totalItems) * 10) / 10
      : undefined;

  const flags: string[] = [];
  if (riasecStraightLinePct > 60) flags.push("RIASEC straight-lining detected");
  if (miStraightLinePct > 60) flags.push("Multiple-Intelligences straight-lining detected");
  if (riasecVariance < 0.4) flags.push("Very low RIASEC variance (answers too similar)");
  if (miVariance < 0.4) flags.push("Very low MI variance (answers too similar)");
  if (riasecContradictions > 6) flags.push(`${riasecContradictions} contradictory RIASEC pairs`);
  if (miContradictions > 5) flags.push(`${miContradictions} contradictory MI pairs`);
  if (aptitudeAnsweredPct < 80) flags.push(`Only ${aptitudeAnsweredPct}% of aptitude items answered`);
  if (avgSecPerItem !== undefined && avgSecPerItem < 2)
    flags.push(`Answered very fast (~${avgSecPerItem}s per item)`);

  let quality: QualityLevel = "high";
  if (flags.length >= 3) quality = "low";
  else if (flags.length >= 1) quality = "medium";

  return {
    quality,
    flags,
    metrics: {
      riasecStraightLinePct,
      miStraightLinePct,
      riasecVariance,
      miVariance,
      riasecContradictions,
      miContradictions,
      aptitudeAnsweredPct,
      totalDurationSec,
      avgSecPerItem,
    },
  };
}
