import { useMemo, useState } from 'react'

const toNumber = (value) => {
  const parsed = Number(String(value).replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : 0
}

const getWeekProgress = (week) => {
  const total = week.days.reduce((acc, day) => acc + day.exercises.length, 0)
  const done = week.days.reduce(
    (acc, day) => acc + day.exercises.filter((exercise) => exercise.completed).length,
    0,
  )
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 }
}

const getActiveWeekId = (weeks) => {
  const weekInProgress = weeks.find((week) => {
    const { total, done } = getWeekProgress(week)
    return done > 0 && done < total
  })
  if (weekInProgress) return weekInProgress.id

  const firstPending = weeks.find((week) => {
    const { done } = getWeekProgress(week)
    return done === 0
  })
  if (firstPending) return firstPending.id

  return weeks.at(-1)?.id
}

export function TrainingPlanView({ plan, onUpdateExercise }) {
  const activeWeekId = useMemo(() => getActiveWeekId(plan.weeks), [plan.weeks])
  const [selectedWeekId, setSelectedWeekId] = useState(null)
  const [showWeekSelector, setShowWeekSelector] = useState(false)
  const [selectedDayId, setSelectedDayId] = useState(null)
  const week =
    plan.weeks.find((item) => item.id === selectedWeekId) ||
    plan.weeks.find((item) => item.id === activeWeekId) ||
    plan.weeks[0]

  if (!week) {
    return null
  }

  const day = week.days.find((item) => item.id === selectedDayId) || week.days[0]
  const progress = getWeekProgress(week)

  return (
    <section className="space-y-4">
      <article className="rounded-2xl border border-[var(--line)] bg-[var(--bg-panel-soft)] p-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">Semana activa</p>
            <p className="font-display text-xl font-semibold text-[var(--text-main)]">{week.name}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowWeekSelector((prev) => !prev)}
            className="rounded-lg border border-[var(--line)] bg-[#0f141a] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)]"
          >
            {showWeekSelector ? 'Ocultar semanas' : 'Cambiar semana'}
          </button>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-[#0f141a]">
          <div className="h-2 rounded-full bg-[var(--accent)]" style={{ width: `${progress.percent}%` }} />
        </div>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          {progress.done} / {progress.total} ejercicios completados
        </p>
      </article>

      {showWeekSelector ? (
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {plan.weeks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedWeekId(item.id)}
              className={`rounded-xl border px-3 py-2 text-sm ${
                item.id === week.id
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                  : 'border-[var(--line)] bg-[#0f141a] text-[var(--text-muted)]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-2">
        {week.days.map((item, index) => {
          const completed = item.exercises.filter((exercise) => exercise.completed).length
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedDayId(item.id)}
              className={`rounded-xl border px-3 py-2 text-left ${
                item.id === day.id
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                  : 'border-[var(--line)] bg-[#0f141a]'
              }`}
            >
              <p className="text-sm font-semibold text-[var(--text-main)]">Dia {index + 1}</p>
              <p className="text-xs text-[var(--text-muted)]">{completed}/{item.exercises.length} hechos</p>
            </button>
          )
        })}
      </div>

      <article className="overflow-hidden rounded-2xl border border-[var(--line)]">
        <h3 className="border-b border-[var(--line)] bg-[var(--bg-panel-soft)] px-3 py-3 font-display text-base sm:px-4 sm:text-lg">
          {day.name}
        </h3>

        <div className="space-y-3 p-3">
          {day.exercises.map((exercise) => (
            <article
              key={exercise.id}
              className={`rounded-xl border p-3 ${exercise.completed ? 'border-[var(--accent)] bg-[var(--accent-soft)]/40' : 'border-[var(--line)] bg-[#0f141a]'}`}
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <p className="text-base font-semibold text-[var(--text-main)]">{exercise.exercise}</p>
                <button
                  type="button"
                  onClick={() => onUpdateExercise(week.id, day.id, exercise.id, 'completed', !exercise.completed)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                    exercise.completed
                      ? 'bg-[var(--accent)] text-white'
                      : 'border border-[var(--line)] bg-[#111a22] text-[var(--text-muted)]'
                  }`}
                >
                  {exercise.completed ? 'Hecho' : 'Pendiente'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  ['sets', 'Sets'],
                  ['reps', 'Reps'],
                  ['rest', 'Rest'],
                ].map(([field, label]) => (
                  <label key={field} className="text-xs text-[var(--text-muted)]">
                    {label}
                    <input
                      value={exercise[field]}
                      onChange={(event) =>
                        onUpdateExercise(week.id, day.id, exercise.id, field, event.target.value)
                      }
                      className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[#121a22] px-2 py-2 text-sm outline-none focus:border-[var(--accent)]"
                    />
                  </label>
                ))}
                <label className="text-xs text-[var(--text-muted)]">
                  Weight (kg)
                  <input
                    value={exercise.weight}
                    onChange={(event) =>
                      onUpdateExercise(week.id, day.id, exercise.id, 'weight', event.target.value)
                    }
                    inputMode="decimal"
                    className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[#121a22] px-2 py-2 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </label>
              </div>

              <div className="mt-2 flex gap-2">
                {[2.5, 5].map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => {
                      const next = Math.max(0, toNumber(exercise.weight) + step)
                      onUpdateExercise(week.id, day.id, exercise.id, 'weight', String(next))
                    }}
                    className="rounded-lg border border-[var(--line)] bg-[var(--bg-panel-soft)] px-3 py-1.5 text-xs font-medium text-[var(--text-main)]"
                  >
                    +{step}kg
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const next = Math.max(0, toNumber(exercise.weight) - 2.5)
                    onUpdateExercise(week.id, day.id, exercise.id, 'weight', String(next))
                  }}
                  className="rounded-lg border border-[var(--line)] bg-[var(--bg-panel-soft)] px-3 py-1.5 text-xs font-medium text-[var(--text-main)]"
                >
                  -2.5kg
                </button>
              </div>

              <label className="mt-2 block text-xs text-[var(--text-muted)]">
                Notes
                <input
                  value={exercise.notes}
                  onChange={(event) =>
                    onUpdateExercise(week.id, day.id, exercise.id, 'notes', event.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-[var(--line)] bg-[#121a22] px-2 py-2 text-sm outline-none focus:border-[var(--accent)]"
                />
              </label>
            </article>
          ))}
        </div>
      </article>
    </section>
  )
}
