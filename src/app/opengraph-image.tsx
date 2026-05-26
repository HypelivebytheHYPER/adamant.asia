import { ImageResponse } from "next/og";

export const alt = "Adamant — Systems for teams that move fast";
export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#121212",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 400,
            color: "#f0eee9",
            fontFamily: "Georgia, 'Times New Roman', serif",
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          Build once. Run forever.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#7e7d7a",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Systems that answer questions so you don&apos;t have to.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            fontSize: 20,
            color: "#ff7a3d",
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Adamant
        </div>
      </div>
    ),
    { ...size }
  );
}
