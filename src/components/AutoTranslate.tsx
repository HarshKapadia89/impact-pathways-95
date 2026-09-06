import { useEffect } from "react";
import { useLang } from "@/lib/lang";

/**
 * Site-wide translation layer.
 *
 * A generated phrase book (public/auto/<lang>.json) maps every English phrase
 * used anywhere in the app — pages, menus, career lists, exams, colleges and
 * LevelUp Lab lessons — to Gujarati, Hindi and Marathi. This component swaps
 * text nodes in place whenever the language changes and keeps watching the DOM
 * so newly rendered content is translated too.
 *
 * Components that already have hand-written translations keep them: their text
 * is not English, so nothing matches and nothing is replaced.
 */

type Dict = Record<string, string>;

const cache = new Map<string, Dict>();
const originals = new WeakMap<Text, string>();
const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE"]);

function translateNode(node: Text, dict: Dict | null) {
  const parent = node.parentElement;
  if (!parent || SKIP.has(parent.tagName)) return;
  if (parent.closest("[data-no-translate]")) return;

  const source = originals.get(node) ?? node.nodeValue ?? "";
  if (!source.trim()) return;

  if (!dict) {
    if (originals.has(node) && node.nodeValue !== source) node.nodeValue = source;
    return;
  }

  const trimmed = source.trim();
  const hit = dict[trimmed];
  if (!hit) return;
  if (!originals.has(node)) originals.set(node, source);
  const next = source.replace(trimmed, hit);
  if (node.nodeValue !== next) node.nodeValue = next;
}

function sweep(root: Node, dict: Dict | null) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    translateNode(current as Text, dict);
    current = walker.nextNode();
  }
  if (root.nodeType === Node.TEXT_NODE) translateNode(root as Text, dict);
}

export function AutoTranslate() {
  const lang = useLang();

  useEffect(() => {
    let cancelled = false;
    let observer: MutationObserver | null = null;
    let frame = 0;
    const pending: Node[] = [];

    const start = (dict: Dict | null) => {
      if (cancelled) return;
      sweep(document.body, dict);
      observer = new MutationObserver((records) => {
        for (const record of records) {
          if (record.type === "characterData") pending.push(record.target);
          record.addedNodes.forEach((n) => pending.push(n));
        }
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          const batch = pending.splice(0, pending.length);
          for (const node of batch) {
            if (node.isConnected) sweep(node, dict);
          }
        });
      });
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        characterData: true,
      });
    };

    if (lang === "en") {
      start(null);
    } else {
      const cached = cache.get(lang);
      if (cached) {
        start(cached);
      } else {
        fetch(`/auto/${lang}.json`)
          .then((r) => (r.ok ? r.json() : null))
          .then((dict: Dict | null) => {
            if (!dict || cancelled) return;
            cache.set(lang, dict);
            start(dict);
          })
          .catch(() => undefined);
      }
    }

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [lang]);

  return null;
}
