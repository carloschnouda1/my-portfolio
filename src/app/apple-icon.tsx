import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(150deg, #100e30 0%, #0d0e26 100%)",
          fontFamily: "monospace",
          fontSize: 104,
          fontWeight: 800,
          color: "#22d3ee",
        }}
      >
        <span style={{ color: "#34d399" }}>~</span>
        <span>/</span>
      </div>
    ),
    { ...size }
  );
}
