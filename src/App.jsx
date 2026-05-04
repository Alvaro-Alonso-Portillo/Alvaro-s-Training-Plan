import { useEffect, useMemo, useState } from 'react'
import { DashboardView } from './features/dashboard/DashboardView'
import { ProgressView } from './features/progress/ProgressView'
import { TrainingPlanView } from './features/training-plan/TrainingPlanView'
import { useTrainingPlan } from './hooks/useTrainingPlan'
import { buildMetrics } from './lib/metrics/trainingMetrics'

const tabs = ['Dashboard', 'Training Plan', 'Progress']

function App() {
  const { plan, updateExercise, resetPlan, syncFromSheet, syncMeta, saveToSheet, pushMeta } =
    useTrainingPlan()
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [selectedWeekId, setSelectedWeekId] = useState(plan.weeks[0]?.id)
  const metrics = useMemo(() => buildMetrics(plan), [plan])

  useEffect(() => {
    const selectedExists = plan.weeks.some((week) => week.id === selectedWeekId)
    if (!selectedExists && plan.weeks[0]) {
      setSelectedWeekId(plan.weeks[0].id)
    }
  }, [plan.weeks, selectedWeekId])

  return (
    <main className="mx-auto w-full max-w-7xl p-2 pb-6 sm:p-4 md:p-6">
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--bg-panel)] p-3 shadow-soft sm:rounded-3xl sm:p-5 md:p-7">
        <header className="mb-4 flex flex-col justify-between gap-3 md:mb-6 md:flex-row md:items-end">
          <div>
            <h1 className="font-display text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">Alvaro&apos;s Training Plan</h1>
            <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm md:text-base">
              Seguimiento semanal, progreso y registro en tiempo real.
            </p>
          </div>
          <div className="grid w-full grid-cols-3 gap-2 md:flex md:w-auto md:flex-wrap">
            <button
              type="button"
              onClick={syncFromSheet}
              disabled={syncMeta.loading}
               className="rounded-xl bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {syncMeta.loading ? 'Sync...' : 'Sync Excel'}
            </button>
            <button
              type="button"
              onClick={resetPlan}
              className="rounded-xl border border-[var(--line)] bg-[var(--bg-panel-soft)] px-3 py-2 text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              Reset data
            </button>
            <button
              type="button"
              onClick={saveToSheet}
              disabled={pushMeta.loading}
              className="rounded-xl border border-[var(--line)] bg-white px-3 py-2 text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-60"
            >
              {pushMeta.loading ? 'Saving...' : 'Save Excel'}
            </button>
          </div>
        </header>
        {syncMeta.message ? (
          <p className="mb-4 rounded-xl border border-[var(--line)] bg-[var(--bg-panel-soft)] px-3 py-2 text-sm text-[var(--text-muted)]">
            {syncMeta.message}
          </p>
        ) : null}
        {pushMeta.message ? (
          <p className="mb-4 rounded-xl border border-[var(--line)] bg-[var(--bg-panel-soft)] px-3 py-2 text-sm text-[var(--text-muted)]">
            {pushMeta.message}
          </p>
        ) : null}

        <nav className="mb-5 grid grid-cols-3 gap-1 rounded-2xl bg-[var(--bg-panel-soft)] p-1.5 sm:gap-2 sm:p-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
               className={`rounded-xl px-2 py-2 text-xs font-medium transition sm:px-4 sm:py-2.5 sm:text-sm ${
                activeTab === tab
                  ? 'bg-[var(--accent)] text-white'
                  : 'text-[var(--text-muted)] hover:bg-white hover:text-[var(--text-main)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {activeTab === 'Dashboard' && <DashboardView plan={plan} metrics={metrics} />}
        {activeTab === 'Training Plan' && (
          <TrainingPlanView
            plan={plan}
            selectedWeekId={selectedWeekId}
            onSelectWeek={setSelectedWeekId}
            onUpdateExercise={updateExercise}
          />
        )}
        {activeTab === 'Progress' && <ProgressView metrics={metrics} />}
      </section>
    </main>
  )
}

export default App
