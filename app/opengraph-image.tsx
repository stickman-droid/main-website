import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f8f8f8",
          color: "#1c1c1c",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 82, fontWeight: 800, lineHeight: 1 }}>
            Onboarding & Dashboard UX Design
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, maxWidth: 860 }}>
            Clearer SaaS journeys, cleaner dashboards, and faster user activation.
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#3775e9", fontWeight: 700 }}>
          stickman.design
        </div>
      </div>
    ),
    size
  );
}
