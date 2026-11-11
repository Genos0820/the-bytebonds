import { serializeSchema } from "@/lib/structured-data";

/** Embeds a JSON-LD graph. Renders nothing visible. */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      // Escaped by serializeSchema — see the note there.
      dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }}
    />
  );
}
