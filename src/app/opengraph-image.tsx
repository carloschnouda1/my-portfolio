import { ImageResponse } from "next/og";

export const alt = "Carlos Chnouda — Full Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(150deg, #100e30 0%, #0d0e26 100%)",
          fontFamily: "monospace",
        }}
      >
        {/* mono logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 30,
            color: "#22d3ee",
            marginBottom: 40,
          }}
        >
          <span style={{ color: "#34d399" }}>{">_"}</span>
          <span>~/carlos</span>
        </div>

        {/* eyebrow */}
        <div
          style={{
            fontSize: 26,
            color: "#94a3b8",
            marginBottom: 20,
            letterSpacing: 2,
          }}
        >
          {"// available for freelance & collaboration"}
        </div>

        {/* name */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Carlos Chnouda
        </div>

        {/* title with gradient */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1,
            marginTop: 8,
            background: "linear-gradient(90deg, #22d3ee, #34d399)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Full Stack Engineer
        </div>

        {/* stack line */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: 48,
            fontSize: 26,
            color: "#cbd5e1",
          }}
        >
          {["Laravel", "Next.js", "TypeScript", "React", "React Native"].map(
            (t) => (
              <span
                key={t}
                style={{
                  border: "1px solid rgba(34,211,238,0.35)",
                  borderRadius: 10,
                  padding: "8px 18px",
                  color: "#7dd3fc",
                }}
              >
                {t}
              </span>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
