import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { StatCard } from '../../components/ui/StatCard'

export function DashboardView({ plan, metrics }) {
  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="grid gap-3 md:grid-cols-3">
        <StatCard
          label="Entrenamientos completados"
          value={`${metrics.dayCompletions} / ${plan.weeks[0].days.length}`}
          helper="Semana actual"
        />
        <StatCard label="Total ejercicios" value={metrics.totalExercises} helper="Semanas 1 a 4" />
        <StatCard
          label="Volumen total aprox"
          value={Math.round(metrics.totalVolume)}
          helper="sets x reps x weight"
        />
      </div>

      <div className="grid gap-3 sm:gap-4 xl:grid-cols-2">
        <article className="h-72 rounded-2xl border border-[var(--line)] p-3 sm:h-80 sm:p-4">
          <h3 className="mb-2 font-display text-base sm:mb-3 sm:text-lg">Progreso por semana</h3>
          <ResponsiveContainer width="100%" height="88%">
            <BarChart data={metrics.weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d8e2ea" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#0f9d8f" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <article className="h-72 rounded-2xl border border-[var(--line)] p-3 sm:h-80 sm:p-4">
          <h3 className="mb-2 font-display text-base sm:mb-3 sm:text-lg">Peso promedio por ejercicio</h3>
          <ResponsiveContainer width="100%" height="88%">
            <BarChart data={metrics.weightByExercise} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d8e2ea" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="exercise" width={88} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="avgWeight" fill="#1f6feb" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </div>

      <article className="rounded-2xl border border-[var(--line)] p-3 sm:p-4">
        <h3 className="mb-2 font-display text-base sm:mb-3 sm:text-lg">Notas de dolor / molestias</h3>
        {metrics.discomfortNotes.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">Sin notas de molestias registradas.</p>
        ) : (
          <div className="space-y-2">
            {metrics.discomfortNotes.map((note, index) => (
              <p key={`${note.exercise}-${index}`} className="rounded-lg bg-[var(--bg-panel-soft)] px-3 py-2 text-sm">
                <span className="font-medium">{note.week}</span> - {note.day} - {note.exercise}: {note.note}
              </p>
            ))}
          </div>
        )}
      </article>
    </section>
  )
}
