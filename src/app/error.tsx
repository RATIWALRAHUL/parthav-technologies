"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log for observability without exposing details to the user.
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(160deg, var(--color-deep-navy) 0%, var(--color-navy) 100%)",
        color: "var(--color-white)",
        textAlign: "center",
        padding: "80px 0",
      }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--space-4)",
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "var(--radius-lg)",
              background: "rgba(255, 106, 0, 0.1)",
              border: "1px solid rgba(255, 106, 0, 0.3)",
              color: "var(--color-orange-light)",
              marginBottom: "var(--space-2)",
            }}
          >
            <AlertTriangle size={28} strokeWidth={1.75} />
          </span>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--color-white)",
            }}
          >
            Something went wrong.
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--color-text-muted-on-dark)",
            }}
          >
            Please try again. If the problem continues, reach out and we&apos;ll help directly.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "var(--space-4)",
              marginTop: "var(--space-4)",
            }}
          >
            <Button onClick={reset} variant="primary">
              Try Again
            </Button>
            <Button href="/" variant="secondary">
              Back to Home
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
