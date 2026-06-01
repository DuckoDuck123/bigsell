// store.js — load data, merge sold-status, expose helpers.
// All three JSON files live under /data. Only status.json changes often.

const DATA = "data";

let _site = null;
let _listings = null;

async function getJSON(path) {
  const res = await fetch(`${path}?v=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`无法加载 ${path} (${res.status})`);
  return res.json();
}

/** Load everything once, merge status onto listings, compute derived prices. */
export async function loadStore() {
  if (_listings && _site) return { site: _site, listings: _listings };

  const [site, inventory, status] = await Promise.all([
    getJSON(`${DATA}/site.json`),
    getJSON(`${DATA}/inventory.json`),
    getJSON(`${DATA}/status.json`),
  ]);

  _site = site;
  _listings = inventory.listings.map((l) => decorate(l, status, site));
  return { site: _site, listings: _listings };
}

export async function getListing(id) {
  const { site, listings } = await loadStore();
  return { site, listing: listings.find((l) => l.id === id) || null, listings };
}

function decorate(listing, status, site) {
  const items = listing.items || [];
  // Only sum real numbers; null / 0 means "not priced yet".
  const originalTotal = items.reduce((s, it) => s + (num(it.originalPrice) || 0), 0);
  const originalKnown = originalTotal > 0;

  const askingNum = num(listing.askingPrice);
  const priceKnown = askingNum != null && askingNum > 0;
  const asking = priceKnown ? askingNum : null;

  const canCompare = priceKnown && originalKnown;
  const saved = canCompare ? Math.max(0, originalTotal - asking) : 0;
  const pct = canCompare ? Math.round((saved / originalTotal) * 100) : 0;

  const state = normalizeStatus(status[listing.id]);
  return {
    ...listing,
    currency: site.currency || "¥",
    originalTotal,
    originalKnown,
    asking,
    priceKnown,
    saved,
    discountPct: pct,
    itemCount: items.length,
    state, // available | reserved | sold
  };
}

function num(v) {
  return typeof v === "number" && isFinite(v) ? v : null;
}

function normalizeStatus(v) {
  const s = String(v || "available").toLowerCase();
  return ["available", "reserved", "sold"].includes(s) ? s : "available";
}

/* --------------------------- formatting helpers ------------------------ */
export function money(n, cur = "¥") {
  return `${cur}${Number(n).toLocaleString("zh-CN")}`;
}

export const STATE_LABEL = {
  available: "在售",
  reserved: "已预定",
  sold: "已售出",
};
