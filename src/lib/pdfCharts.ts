// Pure jsPDF vector chart helpers used by the psychometric report.
// No external dependencies — all geometry is computed and drawn with lines/polygons.

import type jsPDF from "jspdf";

type RGB = [number, number, number];

interface RadarOpts {
  cx: number;
  cy: number;
  radius: number;
  axes: { label: string; value: number }[]; // value 0-100
  rings?: number; // default 4 (25/50/75/100)
  ringColor?: RGB;
  axisColor?: RGB;
  fillColor?: RGB;
  strokeColor?: RGB;
  labelColor?: RGB;
  fillOpacity?: number; // 0-1
  labelFontSize?: number;
  valueFontSize?: number;
  showValues?: boolean;
}

/**
 * Draws a multi-axis radar / spider chart. For 6 axes positioned at the
 * canonical Holland angles this also doubles as the RIASEC hexagon.
 */
export function drawRadar(doc: jsPDF, opts: RadarOpts) {
  const {
    cx,
    cy,
    radius,
    axes,
    rings = 4,
    ringColor = [225, 225, 235],
    axisColor = [200, 200, 215],
    fillColor = [60, 50, 130],
    strokeColor = [40, 30, 95],
    labelColor = [30, 30, 50],
    fillOpacity = 0.28,
    labelFontSize = 9,
    valueFontSize = 8,
    showValues = true,
  } = opts;

  const n = axes.length;
  // Start at top (-PI/2) so the first axis points up.
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;

  // --- concentric rings ---
  doc.setLineWidth(0.2);
  doc.setDrawColor(ringColor[0], ringColor[1], ringColor[2]);
  for (let r = 1; r <= rings; r++) {
    const rad = (radius * r) / rings;
    const pts: [number, number][] = [];
    for (let i = 0; i < n; i++) {
      const a = angle(i);
      pts.push([cx + rad * Math.cos(a), cy + rad * Math.sin(a)]);
    }
    polyline(doc, pts, true);
  }

  // --- axes ---
  doc.setDrawColor(axisColor[0], axisColor[1], axisColor[2]);
  doc.setLineWidth(0.25);
  for (let i = 0; i < n; i++) {
    const a = angle(i);
    doc.line(cx, cy, cx + radius * Math.cos(a), cy + radius * Math.sin(a));
  }

  // --- data polygon (translucent fill via GState if available) ---
  const dataPts: [number, number][] = axes.map((ax, i) => {
    const v = Math.max(0, Math.min(100, ax.value)) / 100;
    const a = angle(i);
    return [cx + radius * v * Math.cos(a), cy + radius * v * Math.sin(a)];
  });

  // Translucent fill
  try {
    // jsPDF GState for opacity
    type GStateCtor = new (opts: { opacity: number; "stroke-opacity": number }) => unknown;
    const docAny = doc as unknown as {
      GState?: GStateCtor;
      setGState?: (g: unknown) => void;
    };
    if (docAny.GState && docAny.setGState) {
      docAny.setGState(new docAny.GState({ opacity: fillOpacity, "stroke-opacity": 1 }));
    }
  } catch {
    /* ignore */
  }
  doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
  doc.setDrawColor(strokeColor[0], strokeColor[1], strokeColor[2]);
  doc.setLineWidth(0.6);
  filledPolygon(doc, dataPts);

  // Reset opacity
  try {
    type GStateCtor = new (opts: { opacity: number; "stroke-opacity": number }) => unknown;
    const docAny = doc as unknown as {
      GState?: GStateCtor;
      setGState?: (g: unknown) => void;
    };
    if (docAny.GState && docAny.setGState) {
      docAny.setGState(new docAny.GState({ opacity: 1, "stroke-opacity": 1 }));
    }
  } catch {
    /* ignore */
  }

  // Vertex dots
  doc.setFillColor(strokeColor[0], strokeColor[1], strokeColor[2]);
  for (const [x, y] of dataPts) {
    doc.circle(x, y, 0.9, "F");
  }

  // --- labels ---
  doc.setTextColor(labelColor[0], labelColor[1], labelColor[2]);
  doc.setFontSize(labelFontSize);
  for (let i = 0; i < n; i++) {
    const a = angle(i);
    const lx = cx + (radius + 7) * Math.cos(a);
    const ly = cy + (radius + 7) * Math.sin(a);
    let align: "left" | "center" | "right" = "center";
    const cosA = Math.cos(a);
    if (cosA > 0.25) align = "left";
    else if (cosA < -0.25) align = "right";
    doc.text(axes[i].label, lx, ly + 1.2, { align });
  }

  // --- value chips next to vertices ---
  if (showValues) {
    doc.setFontSize(valueFontSize);
    for (let i = 0; i < n; i++) {
      const a = angle(i);
      const v = Math.max(0, Math.min(100, axes[i].value));
      const lx = cx + (radius + 7) * Math.cos(a);
      const ly = cy + (radius + 7) * Math.sin(a) + 4.5;
      let align: "left" | "center" | "right" = "center";
      const cosA = Math.cos(a);
      if (cosA > 0.25) align = "left";
      else if (cosA < -0.25) align = "right";
      doc.setTextColor(110, 110, 130);
      doc.text(`${v}%`, lx, ly, { align });
    }
  }
}

function polyline(doc: jsPDF, pts: [number, number][], close = false) {
  if (pts.length < 2) return;
  for (let i = 0; i < pts.length - 1; i++) {
    doc.line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
  }
  if (close) doc.line(pts[pts.length - 1][0], pts[pts.length - 1][1], pts[0][0], pts[0][1]);
}

function filledPolygon(doc: jsPDF, pts: [number, number][]) {
  if (pts.length < 3) return;
  // jsPDF lines() takes deltas from a starting point.
  const start = pts[0];
  const deltas: [number, number][] = [];
  for (let i = 1; i < pts.length; i++) {
    deltas.push([pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]]);
  }
  // Close polygon
  deltas.push([pts[0][0] - pts[pts.length - 1][0], pts[0][1] - pts[pts.length - 1][1]]);
  // Style "FD" = fill + stroke
  doc.lines(deltas, start[0], start[1], [1, 1], "FD", true);
}

/**
 * Proficiency band (Beginner / Developing / Proficient / Advanced) for an aptitude pct.
 */
export function proficiencyBand(pct: number): { label: string; color: RGB } {
  if (pct >= 75) return { label: "Advanced", color: [38, 130, 90] };
  if (pct >= 55) return { label: "Proficient", color: [60, 50, 130] };
  if (pct >= 35) return { label: "Developing", color: [220, 145, 50] };
  return { label: "Emerging", color: [180, 80, 80] };
}

/**
 * Draws a labelled progress bar with a coloured proficiency chip on the right.
 */
export function drawScoreBar(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  label: string,
  pct: number,
  opts?: { trackColor?: RGB; fillColor?: RGB; chip?: boolean; sub?: string },
) {
  const trackColor = opts?.trackColor ?? [232, 232, 240];
  const fillColor = opts?.fillColor ?? [60, 50, 130];
  const showChip = opts?.chip ?? false;

  // label (left)
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 50);
  doc.text(label, x, y);
  if (opts?.sub) {
    doc.setFontSize(7.5);
    doc.setTextColor(140, 140, 155);
    doc.text(opts.sub, x, y + 3.6);
    doc.setTextColor(30, 30, 50);
  }

  // bar
  const barX = x + 60;
  const barW = width - 60 - (showChip ? 28 : 14);
  doc.setFillColor(trackColor[0], trackColor[1], trackColor[2]);
  doc.roundedRect(barX, y - 3, barW, 4, 1.4, 1.4, "F");
  const v = Math.max(0, Math.min(100, pct));
  doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
  doc.roundedRect(barX, y - 3, (barW * v) / 100, 4, 1.4, 1.4, "F");

  // value
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 50);
  doc.text(`${v}%`, barX + barW + 2, y);

  if (showChip) {
    const band = proficiencyBand(v);
    doc.setFillColor(band.color[0], band.color[1], band.color[2]);
    doc.roundedRect(x + width - 24, y - 3.8, 24, 5.2, 1.5, 1.5, "F");
    doc.setFontSize(7);
    doc.setTextColor(255, 255, 255);
    doc.text(band.label, x + width - 12, y - 0.2, { align: "center" });
    doc.setTextColor(30, 30, 50);
  }
}
