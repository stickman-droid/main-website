import type { AnalyticsProperties } from "./events";
import { getPageKey } from "./route-registry";
import {
  getCampaignParams,
  getDeviceType,
  getSessionId,
  getTrafficChannel,
} from "./utils";

export function getGlobalProperties(): AnalyticsProperties {
  if (typeof window === "undefined") return {};

  const pathname = window.location.pathname;
  const viewport = `${window.innerWidth}x${window.innerHeight}`;
  const screenResolution =
    typeof screen !== "undefined" ? `${screen.width}x${screen.height}` : undefined;

  return {
    page: getPageKey(pathname),
    pathname,
    url: window.location.href,
    page_title: document.title,
    referrer: document.referrer || undefined,
    device_type: getDeviceType(),
    screen_resolution: screenResolution,
    viewport,
    language: navigator.language,
    timestamp: new Date().toISOString(),
    environment: process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV,
    release_version: process.env.NEXT_PUBLIC_RELEASE_VERSION,
    session_id: getSessionId(),
    traffic_channel: getTrafficChannel(),
    ...getCampaignParams(),
  };
}
