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
          backgroundColor: "#0A1422",
          color: "#F0F4FA",
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
              background: "#83B0E1",
              color: "#0A1422",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            JB
          </div>
          <div style={{ fontSize: 18, color: "#8B9BB5", letterSpacing: 4 }}>
            SIGNAL · SYSTEM · STORY
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95 }}>
            Engineering intelligent
          </div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95, color: "#83B0E1" }}>
            products from signal to system.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(240,244,250,0.13)",
            paddingTop: 24,
            fontSize: 18,
            color: "#8B9BB5",
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
