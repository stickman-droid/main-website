import type { AnalyticsProperties } from "./events";

const sessionIdKey = "stickman_analytics_session_id";
const sessionStartedAtKey = "stickman_analytics_session_started_at";
const sessionPageCountKey = "stickman_analytics_page_count";
const sessionMeaningfulCountKey = "stickman_analytics_meaningful_count";
const firstSessionKey = "stickman_analytics_seen";
const utmStorageKey = "stickman_analytics_utm";

export function getDeviceType() {
  if (typeof window === "undefined") return "unknown";
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export function getSessionId() {
  if (typeof window === "undefined") return undefined;

  let sessionId = window.sessionStorage.getItem(sessionIdKey);
  if (!sessionId) {
    sessionId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.sessionStorage.setItem(sessionIdKey, sessionId);
    window.sessionStorage.setItem(sessionStartedAtKey, String(Date.now()));
    window.sessionStorage.setItem(sessionPageCountKey, "0");
    window.sessionStorage.setItem(sessionMeaningfulCountKey, "0");
  }

  return sessionId;
}

export function getIsFirstSession() {
  if (typeof window === "undefined") return false;
  const hasSeen = window.localStorage.getItem(firstSessionKey);
  if (!hasSeen) {
    window.localStorage.setItem(firstSessionKey, "1");
    return true;
  }
  return false;
}

export function incrementSessionPageCount() {
  if (typeof window === "undefined") return 0;
  const current = Number(window.sessionStorage.getItem(sessionPageCountKey) ?? "0");
  const next = current + 1;
  window.sessionStorage.setItem(sessionPageCountKey, String(next));
  return next;
}

export function getSessionPageCount() {
  if (typeof window === "undefined") return 0;
  return Number(window.sessionStorage.getItem(sessionPageCountKey) ?? "0");
}

export function incrementMeaningfulInteraction() {
  if (typeof window === "undefined") return;
  const current = Number(window.sessionStorage.getItem(sessionMeaningfulCountKey) ?? "0");
  window.sessionStorage.setItem(sessionMeaningfulCountKey, String(current + 1));
}

export function getMeaningfulInteractionCount() {
  if (typeof window === "undefined") return 0;
  return Number(window.sessionStorage.getItem(sessionMeaningfulCountKey) ?? "0");
}

export function getSessionDurationSeconds() {
  if (typeof window === "undefined") return 0;
  const startedAt = Number(window.sessionStorage.getItem(sessionStartedAtKey) ?? Date.now());
  return Math.max(0, Math.round((Date.now() - startedAt) / 1000));
}

export function persistCampaignParams(search: string) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
  ];
  const values: AnalyticsProperties = {};

  keys.forEach((key) => {
    const value = params.get(key);
    if (value) values[key] = value;
  });

  if (Object.keys(values).length > 0) {
    window.sessionStorage.setItem(utmStorageKey, JSON.stringify(values));
  }
}

export function getCampaignParams(): AnalyticsProperties {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const persisted = window.sessionStorage.getItem(utmStorageKey);
  const values: AnalyticsProperties = persisted ? JSON.parse(persisted) : {};

  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
  ].forEach((key) => {
    const value = params.get(key);
    if (value) values[key] = value;
  });

  return values;
}

export function getTrafficChannel() {
  if (typeof window === "undefined") return "unknown";
  const campaign = getCampaignParams();
  const medium = String(campaign.utm_medium ?? "").toLowerCase();
  const source = String(campaign.utm_source ?? "").toLowerCase();
  const referrer = document.referrer;

  if (campaign.gclid || ["cpc", "paid", "paid_search"].includes(medium)) return "paid_search";
  if (["paid_social", "social"].includes(medium)) return "social";
  if (medium === "email") return "email";
  if (medium === "organic") return "organic";
  if (source.includes("linkedin") || source.includes("youtube")) return "social";
  if (!referrer) return "direct";

  try {
    const host = new URL(referrer).hostname;
    if (host.includes("google") || host.includes("bing") || host.includes("duckduckgo")) {
      return "organic";
    }
    if (host.includes("linkedin") || host.includes("youtube") || host.includes("facebook")) {
      return "social";
    }
  } catch {
    return "referral";
  }

  return "referral";
}

export function sanitizeId(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
}

export function getLinkType(url: URL) {
  if (url.protocol === "mailto:") return "email";
  if (typeof window === "undefined") return "external";
  return url.origin === window.location.origin ? "internal" : "external";
}

export function getDestinationHost(href: string) {
  try {
    return new URL(href, window.location.href).hostname;
  } catch {
    return undefined;
  }
}
