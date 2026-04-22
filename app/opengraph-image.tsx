import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Von Steiger & Associates — International Litigation & Asset Recovery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #0F1D32 50%, #1A1A2E 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "4px",
              border: "2px solid #C9A84C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C9A84C",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            VS
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "3px",
            }}
          >
            VON STEIGER & ASSOCIATES
          </div>
        </div>

        <div
          style={{
            color: "#FFFFFF",
            fontSize: "52px",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          International Litigation &{" "}
          <span style={{ color: "#C9A84C" }}>Asset Recovery</span>
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "22px",
            lineHeight: 1.5,
            maxWidth: "700px",
            marginBottom: "40px",
          }}
        >
          Over €2.3 billion recovered across 14 jurisdictions. Prestigious legal
          counsel for Fortune 500 clients and luxury conglomerates.
        </div>

        <div
          style={{
            display: "flex",
            gap: "32px",
          }}
        >
          {[
            { value: "€2.3B+", label: "Recovered" },
            { value: "98%", label: "Success Rate" },
            { value: "14+", label: "Jurisdictions" },
            { value: "20+", label: "Years" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "#C9A84C",
                  fontSize: "28px",
                  fontWeight: 700,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "14px",
                  marginTop: "4px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            color: "rgba(255,255,255,0.3)",
            fontSize: "16px",
          }}
        >
          www.vonsteiger.law
        </div>
      </div>
    ),
    { ...size }
  );
}
