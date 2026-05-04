import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export function ProgressView({ metrics }) {
  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="grid gap-3 sm:gap-4 xl:grid-cols-2">
        <article className="h-72 rounded-2xl border border-[var(--line)] p-3 sm:h-80 sm:p-4">
          <h3 className="mb-2 font-display text-base sm:mb-3 sm:text-lg">Evolucion semanal</h3>
          <ResponsiveContainer width="100%" height="88%">
            <LineChart data={metrics.weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d8e2ea" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="volume" stroke="#f59f00" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </article>

        <article className="h-72 rounded-2xl border border-[var(--line)] p-3 sm:h-80 sm:p-4">
          <h3 className="mb-2 font-display text-base sm:mb-3 sm:text-lg">Ejercicios mas repetidos</h3>
          <ResponsiveContainer width="100%" height="88%">
            <BarChart data={metrics.topRepeated}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d8e2ea" />
              <XAxis dataKey="exercise" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0f9d8f" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </article>
      </div>

      <article className="rounded-2xl border border-[var(--line)] p-3 sm:p-4">
        <h3 className="mb-2 font-display text-base sm:mb-3 sm:text-lg">Pesos maximos por ejercicio</h3>
        {metrics.maxWeights.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)]">Aun no hay pesos registrados.</p>
        ) : (
          <div className="grid gap-2 md:grid-cols-2">
            {metrics.maxWeights.map((item) => (
              <p key={item.exercise} className="rounded-lg bg-[var(--bg-panel-soft)] px-3 py-2 text-sm">
                {item.exercise}: <span className="font-semibold">{item.maxWeight} kg</span>
              </p>
            ))}
          </div>
        )}
      </article>

      <article className="grid grid-cols-2 gap-3 rounded-2xl border border-[var(--line)] bg-[var(--bg-panel-soft)] p-3 sm:p-4 md:grid-cols-4">
        <Metric label="Resumen mensual" value={`${metrics.monthlySummary.totalWeeks} semanas`} />
        <Metric label="Dias completados" value={metrics.monthlySummary.completedDays} />
        <Metric label="Ejercicios registrados" value={metrics.monthlySummary.trackedExercises} />
        <Metric label="Volumen estimado" value={Math.round(metrics.monthlySummary.estimatedVolume)} />
      </article>
    </section>
  )
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
    </div>
  )
}
