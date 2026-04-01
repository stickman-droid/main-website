type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  nextSteps: string[];
};

export function PagePlaceholder({
  eyebrow,
  title,
  description,
  nextSteps,
}: PagePlaceholderProps) {
  return (
    <main className="flex flex-1 bg-zinc-50">
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-20 sm:px-10 lg:px-12">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
            {eyebrow}
          </p>
          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
              {description}
            </p>
          </div>
        </div>

        <div className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-zinc-950">Implementation Queue</h2>
          <ul className="space-y-3 text-sm leading-6 text-zinc-600 sm:text-base">
            {nextSteps.map((step) => (
              <li key={step} className="border-l-2 border-zinc-200 pl-4">
                {step}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
