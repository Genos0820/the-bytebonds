import { ogColors, ogSize } from "./og";

/**
 * The shared layout for every generated OG image.
 *
 * Written against Satori's subset of CSS, not the browser's: every element with
 * more than one child declares `display: flex` explicitly (Satori has no block
 * layout), spacing uses margins rather than `gap`, and there are no custom
 * properties or `oklch()` colours. Breaking any of those fails at render time
 * rather than at type-check, so keep changes conservative.
 */
export function OgCard({
  eyebrow,
  title,
  footer,
  accent = ogColors.accent,
}: {
  eyebrow: string;
  title: string;
  /** Small text along the bottom — team name, client, role. */
  footer: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        width: ogSize.width,
        height: ogSize.height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: ogColors.bg,
        backgroundImage: `radial-gradient(900px 600px at 85% 15%, ${accent}38 0%, transparent 60%), radial-gradient(700px 500px at 10% 95%, ${ogColors.accent2}22 0%, transparent 62%)`,
        fontFamily: "Space Grotesk",
        color: ogColors.fg,
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: accent,
            marginRight: 16,
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: accent,
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: title.length > 48 ? 64 : 82,
          lineHeight: 1.05,
          letterSpacing: -2,
          fontWeight: 700,
          maxWidth: 940,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${ogColors.border}`,
          paddingTop: 28,
        }}
      >
        <div style={{ fontSize: 26, color: ogColors.muted }}>{footer}</div>
        <div style={{ fontSize: 22, letterSpacing: 3, color: ogColors.subtle }}>
          SIX SPECIALISTS
        </div>
      </div>
    </div>
  );
}
