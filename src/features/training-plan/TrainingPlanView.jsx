import { useMemo, useState } from 'react'
import { ExerciseCompactRow } from './ExerciseCompactRow'
import { ExerciseQuickEditor } from './ExerciseQuickEditor'

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
  const [expandedExerciseId, setExpandedExerciseId] = useState(null)
  const week =
    plan.weeks.find((item) => item.id === selectedWeekId) ||
    plan.weeks.find((item) => item.id === activeWeekId) ||
    plan.weeks[0]

  if (!week) {
    return null
  }

  const day = week.days.find((item) => item.id === selectedDayId) || week.days[0]
  const progress = getWeekProgress(week)

  const updateExerciseField = (exerciseId, field, value) => {
    onUpdateExercise(week.id, day.id, exerciseId, field, value)
  }

  const handleSaveAndNext = (exerciseId) => {
    const exerciseIndex = day.exercises.findIndex((exercise) => exercise.id === exerciseId)
    const nextExercise = day.exercises[exerciseIndex + 1]
    setExpandedExerciseId(nextExercise?.id ?? null)
  }

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
              onClick={() => {
                setSelectedWeekId(item.id)
                setExpandedExerciseId(null)
              }}
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
              onClick={() => {
                setSelectedDayId(item.id)
                setExpandedExerciseId(null)
              }}
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
          {day.exercises.length === 0 ? (
            <p className="rounded-xl border border-[var(--line)] bg-[#0f141a] px-3 py-4 text-sm text-[var(--text-muted)]">
              No hay ejercicios configurados para este dia.
            </p>
          ) : null}

          {day.exercises.map((exercise) => {
            const isExpanded = expandedExerciseId === exercise.id

            return (
              <div key={exercise.id} className="space-y-2">
                <ExerciseCompactRow
                  exercise={exercise}
                  isExpanded={isExpanded}
                  onToggle={() =>
                    setExpandedExerciseId((current) =>
                      current === exercise.id ? null : exercise.id,
                    )
                  }
                />

                {isExpanded ? (
                  <ExerciseQuickEditor
                    exercise={exercise}
                    onUpdateField={(field, value) =>
                      updateExerciseField(exercise.id, field, value)
                    }
                    onToggleCompleted={() =>
                      updateExerciseField(
                        exercise.id,
                        'completed',
                        !exercise.completed,
                      )
                    }
                    onSaveAndNext={() => handleSaveAndNext(exercise.id)}
                  />
                ) : null}
              </div>
            )
          })}
        </div>
      </article>
    </section>
  )
}
