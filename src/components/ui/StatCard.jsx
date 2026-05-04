export function StatCard({ label, value, helper }) {
  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--bg-panel-soft)] p-4 shadow-[inset_0_0_0_1px_rgba(208,255,40,0.08)]">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold uppercase tracking-wide text-[var(--accent)]">{value}</p>
      {helper ? <p className="mt-1 text-sm text-[var(--text-muted)]">{helper}</p> : null}
    </article>
  )
}
