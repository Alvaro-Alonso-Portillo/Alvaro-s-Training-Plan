export function StatCard({ label, value, helper }) {
  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--bg-panel-soft)] p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-[var(--text-main)]">{value}</p>
      {helper ? <p className="mt-1 text-sm text-[var(--text-muted)]">{helper}</p> : null}
    </article>
  )
}
