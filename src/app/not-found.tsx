import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div
          className="absolute top-0 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--accent) 34%, transparent) 0%, transparent 68%)",
          }}
        />
      </div>

      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-40 text-center sm:py-48">
        <p className="font-mono text-xs tracking-[0.22em] text-accent uppercase">
          404
        </p>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          That page doesn&rsquo;t exist.
        </h1>
        <p className="mt-5 max-w-md text-base text-fg-muted">
          The link may be out of date, or the project may have moved. The work is
          all still here.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/work">See the work</Button>
          <Button href="/" variant="ghost">
            Back home
          </Button>
        </div>
      </div>
    </main>
  );
}
