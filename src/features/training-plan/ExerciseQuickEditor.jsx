const toNumber = (value) => {
  const parsed = Number(String(value).replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : 0
}

export function ExerciseQuickEditor({
  exercise,
  onUpdateField,
  onToggleCompleted,
  onSaveAndNext,
}) {
  return (
    <article className="rounded-xl border border-[var(--line)] bg-[var(--bg-panel-soft)] p-3 shadow-[inset_0_0_0_1px_rgba(208,255,40,0.06)]">
      <div className="mb-3">
        <p className="text-base font-semibold text-[var(--text-main)]">
          {exercise.exercise}
        </p>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          {[exercise.sets && `${exercise.sets} sets`, exercise.reps && `${exercise.reps} reps`, exercise.rest && `${exercise.rest} rest`, exercise.notes && `Plan: ${exercise.notes}`]
            .filter(Boolean)
            .join(' · ')}
        </p>
      </div>

      <label className="block text-xs text-[var(--text-muted)]">
        Weight (kg)
        <input
          value={exercise.weight}
          onChange={(event) => onUpdateField('weight', event.target.value)}
          inputMode="decimal"
          className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[#121a22] px-3 py-3 text-base outline-none focus:border-[var(--accent)]"
        />
      </label>

      <div className="mt-2 flex gap-2">
        {[2.5, 5].map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => {
              const next = Math.max(0, toNumber(exercise.weight) + step)
              onUpdateField('weight', String(next))
            }}
            className="rounded-lg border border-[var(--line)] bg-[#111a22] px-3 py-2 text-xs font-medium text-[var(--text-main)]"
          >
            +{step}kg
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            const next = Math.max(0, toNumber(exercise.weight) - 2.5)
            onUpdateField('weight', String(next))
          }}
          className="rounded-lg border border-[var(--line)] bg-[#111a22] px-3 py-2 text-xs font-medium text-[var(--text-main)]"
        >
          -2.5kg
        </button>
      </div>

      <label className="mt-3 block text-xs text-[var(--text-muted)]">
        Notes
        <input
          value={exercise.notes}
          onChange={(event) => onUpdateField('notes', event.target.value)}
          className="mt-1 w-full rounded-xl border border-[var(--line)] bg-[#121a22] px-3 py-3 text-sm outline-none focus:border-[var(--accent)]"
        />
      </label>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={onToggleCompleted}
          className={`rounded-xl px-4 py-3 text-sm font-semibold ${
            exercise.completed
              ? 'bg-[var(--accent)] text-[#0b1016]'
              : 'border border-[var(--line)] bg-[#111a22] text-[var(--text-main)]'
          }`}
        >
          {exercise.completed ? 'Marcar pendiente' : 'Hecho'}
        </button>
        <button
          type="button"
          onClick={onSaveAndNext}
          className="rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[#0b1016]"
        >
          Guardar y siguiente
        </button>
      </div>
    </article>
  )
}
