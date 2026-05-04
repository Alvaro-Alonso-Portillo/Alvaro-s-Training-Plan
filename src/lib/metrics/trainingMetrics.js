const toNumber = (value) => {
  if (typeof value === 'number') return value
  if (!value) return 0
  const match = String(value).match(/\d+(?:\.\d+)?/)
  return match ? Number(match[0]) : 0
}

const getAllExercises = (plan) =>
  plan.weeks.flatMap((week) => week.days.flatMap((day) => day.exercises.map((exercise) => ({ ...exercise, day: day.name, week: week.name }))))

export const buildMetrics = (plan) => {
  const allExercises = getAllExercises(plan)
  const currentWeek = plan.weeks[0]
  const dayCompletions = currentWeek.days.filter((day) => day.exercises.every((exercise) => exercise.completed)).length

  const totalExercises = allExercises.length
  const totalVolume = allExercises.reduce(
    (acc, exercise) => acc + toNumber(exercise.sets) * toNumber(exercise.reps) * toNumber(exercise.weight),
    0,
  )

  const weeklyProgress = plan.weeks.map((week) => {
    const completed = week.days.filter((day) => day.exercises.every((exercise) => exercise.completed)).length
    const volume = week.days
      .flatMap((day) => day.exercises)
      .reduce((acc, exercise) => acc + toNumber(exercise.sets) * toNumber(exercise.reps) * toNumber(exercise.weight), 0)

    return {
      week: week.name,
      completed,
      volume,
    }
  })

  const groupedByExercise = allExercises.reduce((acc, exercise) => {
    if (!acc[exercise.exercise]) {
      acc[exercise.exercise] = []
    }
    acc[exercise.exercise].push(exercise)
    return acc
  }, {})

  const topRepeated = Object.entries(groupedByExercise)
    .map(([exercise, values]) => ({
      exercise,
      count: values.length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)

  const maxWeights = Object.entries(groupedByExercise)
    .map(([exercise, values]) => ({
      exercise,
      maxWeight: Math.max(...values.map((item) => toNumber(item.weight))),
    }))
    .filter((item) => item.maxWeight > 0)
    .sort((a, b) => b.maxWeight - a.maxWeight)

  const weightByExercise = Object.entries(groupedByExercise)
    .map(([exercise, values]) => ({
      exercise,
      avgWeight: values.reduce((acc, item) => acc + toNumber(item.weight), 0) / values.length,
    }))
    .filter((item) => item.avgWeight > 0)
    .slice(0, 8)

  const discomfortNotes = allExercises
    .filter((exercise) => exercise.notes && /dolor|molestia|sin dolor|ligero/i.test(exercise.notes))
    .map((exercise) => ({
      week: exercise.week,
      day: exercise.day,
      exercise: exercise.exercise,
      note: exercise.notes,
    }))

  return {
    dayCompletions,
    totalExercises,
    totalVolume,
    weeklyProgress,
    topRepeated,
    maxWeights,
    weightByExercise,
    discomfortNotes,
    monthlySummary: {
      completedDays: weeklyProgress.reduce((acc, week) => acc + week.completed, 0),
      totalWeeks: plan.weeks.length,
      trackedExercises: totalExercises,
      estimatedVolume: totalVolume,
    },
  }
}
