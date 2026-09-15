import { Compass } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Page Not Found | Parthav Technologies",
  description: "The page you're looking for doesn't exist or may have moved.",
};

export default function NotFound() {
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
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "var(--color-orange-light)",
              marginBottom: "var(--space-2)",
            }}
          >
            <Compass size={28} strokeWidth={1.75} />
          </span>

          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3rem, 8vw, 5rem)",
              fontWeight: 800,
              color: "var(--color-orange)",
              lineHeight: 1,
            }}
          >
            404
          </span>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "var(--color-white)",
            }}
          >
            Page not found.
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--color-text-muted-on-dark)",
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
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
            <Button href="/" variant="primary">
              Back to Home
            </Button>
            <Button href="/#contact" variant="secondary">
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
