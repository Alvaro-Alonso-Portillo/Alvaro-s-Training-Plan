export function TrainingPlanView({ plan, selectedWeekId, onSelectWeek, onUpdateExercise }) {
  const week = plan.weeks.find((item) => item.id === selectedWeekId) || plan.weeks[0]

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {plan.weeks.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectWeek(item.id)}
            className={`rounded-xl border px-3 py-2 text-sm ${
              item.id === week.id
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'border-[var(--line)] bg-white text-[var(--text-muted)]'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {week.days.map((day) => (
        <article key={day.id} className="overflow-hidden rounded-2xl border border-[var(--line)]">
          <h3 className="border-b border-[var(--line)] bg-[var(--bg-panel-soft)] px-3 py-3 font-display text-base sm:px-4 sm:text-lg">
            {day.name}
          </h3>

          <div className="space-y-3 p-3 sm:hidden">
            {day.exercises.map((exercise) => (
              <article key={exercise.id} className="rounded-xl border border-[var(--line)] bg-white p-3">
                <p className="mb-2 text-sm font-semibold text-[var(--text-main)]">{exercise.exercise}</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ['sets', 'Sets'],
                    ['reps', 'Reps'],
                    ['weight', 'Weight'],
                    ['rest', 'Rest'],
                  ].map(([field, label]) => (
                    <label key={field} className="text-xs text-[var(--text-muted)]">
                      {label}
                      <input
                        value={exercise[field]}
                        onChange={(event) =>
                          onUpdateExercise(week.id, day.id, exercise.id, field, event.target.value)
                        }
                        className="mt-1 w-full rounded-lg border border-[var(--line)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--accent)]"
                      />
                    </label>
                  ))}
                </div>
                <label className="mt-2 block text-xs text-[var(--text-muted)]">
                  Notes
                  <input
                    value={exercise.notes}
                    onChange={(event) =>
                      onUpdateExercise(week.id, day.id, exercise.id, 'notes', event.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-[var(--line)] bg-white px-2 py-1.5 text-sm outline-none focus:border-[var(--accent)]"
                  />
                </label>
                <label className="mt-3 flex items-center gap-2 text-sm font-medium text-[var(--text-main)]">
                  <input
                    type="checkbox"
                    checked={exercise.completed}
                    onChange={(event) =>
                      onUpdateExercise(week.id, day.id, exercise.id, 'completed', event.target.checked)
                    }
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  Completed
                </label>
              </article>
            ))}
          </div>

          <div className="hidden overflow-auto sm:block">
            <table className="min-w-[920px] w-full border-collapse text-sm">
              <thead>
                <tr className="text-left text-[var(--text-muted)]">
                  {['Exercise', 'Sets', 'Reps', 'Weight', 'Rest', 'Notes', 'Completed'].map((head) => (
                    <th key={head} className="border-b border-[var(--line)] px-3 py-2 font-medium">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {day.exercises.map((exercise) => (
                  <tr key={exercise.id} className="odd:bg-white even:bg-[var(--bg-panel-soft)]/40">
                    <td className="px-3 py-2 font-medium">{exercise.exercise}</td>
                    {['sets', 'reps', 'weight', 'rest', 'notes'].map((field) => (
                      <td key={field} className="px-3 py-2">
                        <input
                          value={exercise[field]}
                          onChange={(event) =>
                            onUpdateExercise(week.id, day.id, exercise.id, field, event.target.value)
                          }
                          className="w-full rounded-lg border border-[var(--line)] bg-white px-2 py-1.5 outline-none focus:border-[var(--accent)]"
                        />
                      </td>
                    ))}
                    <td className="px-3 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={exercise.completed}
                        onChange={(event) =>
                          onUpdateExercise(week.id, day.id, exercise.id, 'completed', event.target.checked)
                        }
                        className="h-4 w-4 accent-[var(--accent)]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      ))}
    </section>
  )
}
