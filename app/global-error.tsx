"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A1628",
          color: "#fff",
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: "480px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              margin: "0 auto 1.5rem",
              borderRadius: "50%",
              backgroundColor: "rgba(201, 168, 76, 0.1)",
              border: "1px solid rgba(201, 168, 76, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            ⚠
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              marginBottom: "2rem",
            }}
          >
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
          <button
            onClick={reset}
            style={{
              backgroundColor: "#C9A84C",
              color: "#0A1628",
              border: "none",
              padding: "0.75rem 2rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              borderRadius: "2px",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
