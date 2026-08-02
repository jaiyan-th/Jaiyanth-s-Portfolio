import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A1422",
          color: "#83B0E1",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "sans-serif",
          borderRadius: 6,
        }}
      >
        JB
      </div>
    ),
    size
  );
}
