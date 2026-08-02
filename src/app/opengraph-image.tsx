import { ImageResponse } from "next/og";
import { IDENTITY } from "@/data/portfolio";

export const runtime = "edge";
export const alt = `${IDENTITY.name} — ${IDENTITY.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#090B0A",
          color: "#F3F2EA",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#B7FF4A",
              color: "#090B0A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            JB
          </div>
          <div style={{ fontSize: 18, color: "#9C9F98", letterSpacing: 4 }}>
            SIGNAL · SYSTEM · STORY
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>
            Engineering intelligent
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95, color: "#B7FF4A" }}>
            products from signal to system.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(243,242,234,0.13)",
            paddingTop: 24,
            fontSize: 18,
            color: "#9C9F98",
          }}
        >
          <div>{IDENTITY.name} — {IDENTITY.role}</div>
          <div>{IDENTITY.location}</div>
        </div>
      </div>
    ),
    size
  );
}
