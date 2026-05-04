const SHEET_ID = '19Gz2ed9zG5NuKARDaxD2thhnYQbO1LHvsiUAwxj0omY'
const MAX_WEEKS_TO_SCAN = 12
const SHEETS_PUSH_URL = import.meta.env.VITE_SHEETS_SYNC_URL

const parseCsvLine = (line) => {
  const cells = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      cells.push(current)
      current = ''
    } else {
      current += char
    }
  }

  cells.push(current)
  return cells
}

const clean = (value) => String(value || '').trim()
const normalizeKey = (value) => clean(value).toLowerCase()

const toExercise = (weekNumber, dayNumber, index, cells) => ({
  id: `w${weekNumber}-d${dayNumber}-e${index + 1}`,
  exercise: clean(cells[1]),
  sets: clean(cells[2]),
  reps: clean(cells[3]),
  weight: clean(cells[4]),
  rest: clean(cells[5]),
  notes: clean(cells[6]),
  completed: clean(cells[7]).toUpperCase() === 'TRUE',
})

const parseWeekCsv = (weekNumber, csvText) => {
  const rows = csvText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseCsvLine)

  const days = []
  let currentDay = null

  rows.forEach((cells) => {
    const cellValue = clean(cells[1])

    if (!cellValue) return

    const dayHeaderMatch = cellValue.match(/(?:^|\s)(Day|Dia|Día)\s+\d+:/i)
    if (dayHeaderMatch) {
      const dayHeader = cellValue.slice(dayHeaderMatch.index).trim()
      currentDay = {
        id: `w${weekNumber}-d${days.length + 1}`,
        name: dayHeader,
        exercises: [],
      }
      days.push(currentDay)
      return
    }

    if (!currentDay) return
    if (/^Exercise$/i.test(cellValue)) return

    const hasExerciseName = clean(cells[1])
    if (!hasExerciseName) return

    currentDay.exercises.push(toExercise(weekNumber, days.length, currentDay.exercises.length, cells))
  })

  if (days.length === 0) return null

  return {
    id: `week-${weekNumber}`,
    name: `Week ${weekNumber}`,
    days,
  }
}

const mergeWeekKeepingProgress = (existingWeek, incomingWeek) => {
  if (!existingWeek) return incomingWeek

  const existingDaysByName = new Map(
    existingWeek.days.map((day) => [normalizeKey(day.name), day]),
  )

  return {
    ...incomingWeek,
    days: incomingWeek.days.map((incomingDay) => {
      const existingDay =
        existingDaysByName.get(normalizeKey(incomingDay.name)) ||
        existingWeek.days.find((day) => day.id === incomingDay.id)

      if (!existingDay) return incomingDay

      const existingExercisesByKey = new Map(
        existingDay.exercises.map((exercise) => [
          normalizeKey(exercise.exercise),
          exercise,
        ]),
      )

      return {
        ...incomingDay,
        exercises: incomingDay.exercises.map((incomingExercise) => {
          const existingExercise =
            existingExercisesByKey.get(normalizeKey(incomingExercise.exercise)) ||
            existingDay.exercises.find(
              (exercise) => exercise.id === incomingExercise.id,
            )

          if (!existingExercise) return incomingExercise

          return {
            ...incomingExercise,
            weight: existingExercise.weight || incomingExercise.weight,
            completed: existingExercise.completed,
            notes: existingExercise.notes || incomingExercise.notes,
          }
        }),
      }
    }),
  }
}

export const syncPlanFromGoogleSheets = async (currentPlan) => {
  const fetchedWeeks = []
  let missingAfterStart = 0

  for (let weekNumber = 1; weekNumber <= MAX_WEEKS_TO_SCAN; weekNumber += 1) {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(`Week ${weekNumber}`)}`

    try {
      const response = await fetch(url)
      if (!response.ok) continue

      const csvText = await response.text()
      const week = parseWeekCsv(weekNumber, csvText)
      if (!week) {
        if (fetchedWeeks.length > 0) {
          missingAfterStart += 1
          if (missingAfterStart >= 2) break
        }
        continue
      }

      fetchedWeeks.push(week)
      missingAfterStart = 0
    } catch {
      if (fetchedWeeks.length > 0) {
        missingAfterStart += 1
        if (missingAfterStart >= 2) break
      }
    }
  }

  if (fetchedWeeks.length === 0) {
    return {
      changed: false,
      plan: currentPlan,
      weeksFound: 0,
    }
  }

  const mergedWeeks = fetchedWeeks.map((incomingWeek) => {
    const existingWeek = currentPlan.weeks.find((week) => week.id === incomingWeek.id)
    return mergeWeekKeepingProgress(existingWeek, incomingWeek)
  })

  const nextPlan = {
    ...currentPlan,
    weeks: mergedWeeks,
  }

  const changed = JSON.stringify(nextPlan) !== JSON.stringify(currentPlan)

  return {
    changed,
    plan: nextPlan,
    weeksFound: fetchedWeeks.length,
  }
}

export const pushPlanToGoogleSheets = async (plan) => {
  if (!SHEETS_PUSH_URL) {
    return {
      ok: false,
      message:
        'Configura VITE_SHEETS_SYNC_URL para habilitar guardado en Google Sheets.',
    }
  }

  try {
    const response = await fetch(SHEETS_PUSH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'alvaro-training-plan',
        timestamp: new Date().toISOString(),
        plan,
      }),
    })

    if (!response.ok) {
      return {
        ok: false,
        message: `Error al guardar en Excel (${response.status}).`,
      }
    }

    return {
      ok: true,
      message: 'Guardado en Excel completado.',
    }
  } catch {
    return {
      ok: false,
      message: 'No se pudo conectar con el endpoint de Google Sheets.',
    }
  }
}
