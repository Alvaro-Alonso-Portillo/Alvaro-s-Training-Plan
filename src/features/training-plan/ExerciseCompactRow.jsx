export function ExerciseCompactRow({
  exercise,
  isExpanded,
  onToggle,
}) {
  const summary = [exercise.sets && `${exercise.sets} sets`, exercise.reps && `${exercise.reps} reps`, exercise.rest && `${exercise.rest} rest`]
    .filter(Boolean)
    .join(' · ')

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-xl border px-3 py-3 text-left transition ${
        isExpanded
          ? 'border-[var(--accent)] bg-[var(--accent-soft)]/30'
          : 'border-[var(--line)] bg-[#0f141a]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[var(--text-main)] sm:text-base">
            {exercise.exercise}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            {summary || 'Sin objetivo definido'}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p
            className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
              exercise.completed
                ? 'bg-[var(--accent)] text-[#0b1016]'
                : 'border border-[var(--line)] text-[var(--text-muted)]'
            }`}
          >
            {exercise.completed ? 'Hecho' : 'Pendiente'}
          </p>
          {exercise.weight ? (
            <p className="mt-2 text-xs font-medium text-[var(--text-main)]">
              {exercise.weight} kg
            </p>
          ) : (
            <p className="mt-2 text-xs text-[var(--text-muted)]">Sin peso</p>
          )}
        </div>
      </div>
    </button>
  )
}
