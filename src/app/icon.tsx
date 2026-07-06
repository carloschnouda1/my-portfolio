import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0e26",
          borderRadius: 14,
          fontFamily: "monospace",
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        <span style={{ color: "#22d3ee" }}>{">"}</span>
        <span style={{ color: "#34d399" }}>_</span>
      </div>
    ),
    { ...size }
  );
}
