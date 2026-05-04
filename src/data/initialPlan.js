const weekTemplates = {
  1: [
    {
      name: 'Day 1: LOWER BODY CONTROLADO + CORE',
      exercises: [
        ['Glute Bridge', '3', '12', '45s', 'Activacion'],
        ['Seated Hamstring Curl', '3', '12', '45s', 'Ligero'],
        ['Abduccion maquina/banda', '3', '15', '45s', 'Controlado'],
        ['Hack Squat / Goblet Squat', '4', '8', '60s', 'Sin dolor'],
        ['Leg Press (pies altos)', '3', '12', '60s', 'Gluteo'],
        ['Leg Curl', '3', '12', '60s', ''],
        ['Hip Thrust', '3', '10', '60s', ''],
        ['Dead Bug', '3', '10', '45s', 'Core'],
        ['Plank', '3', '30-40s', '45s', 'Core'],
      ],
    },
    {
      name: 'Day 2: TREN SUPERIOR (FUERZA + METABOLICO)',
      exercises: [
        ['Bench Press', '4', '6', '60s', 'Sin maximos'],
        ['Dumbbell Row', '4', '10', '60s', 'Apoyado'],
        ['Push Ups inclinadas', '3', '12', '45s', 'Superset'],
        ['Jalon al pecho', '3', '12', '45s', 'Superset'],
        ['Triceps Pushdown', '3', '12', '45s', ''],
        ['Curl mancuerna', '3', '12', '45s', ''],
        ['Pallof Press', '3', '10', '45s', 'Core'],
      ],
    },
    {
      name: 'Day 3: POSTERIOR CHAIN (SEGURA)',
      exercises: [
        ['Hip Thrust', '3', '12', '45s', 'Activacion'],
        ['Curl femoral', '3', '12', '45s', ''],
        ['Trap Bar Deadlift', '4', '5', '75s', '60-70%'],
        ['Remo maquina', '3', '12', '60s', ''],
        ['Jalon neutro', '3', '12', '60s', ''],
        ['Shrugs', '3', '12', '45s', ''],
        ['Bird Dog', '3', '10', '45s', 'Core'],
      ],
    },
    {
      name: 'Day 4: QUEMA GRASA + FUNCIONAL SIN IMPACTO',
      exercises: [
        ['Bike / Eliptica', '3-4', '2 min', '30s', 'Circuito'],
        ['KB Deadlift', '3-4', '12', '30s', ''],
        ['Battle Ropes', '3-4', '20s', '30s', ''],
        ['Farmer Walk', '3-4', '30m', '30s', 'Ligero'],
        ['Plank', '3-4', '30s', '30s', 'Core'],
      ],
    },
  ],
  2: [
    {
      name: 'Day 1: LOWER BODY CONTROLADO + CORE',
      exercises: [
        ['Glute Bridge March', '3', '12', '45s', 'Activacion'],
        ['Seated Leg Curl unilateral', '3', '10', '45s', 'Ligero'],
        ['Banded Lateral Walk', '3', '15', '45s', 'Controlado'],
        ['Box Squat', '4', '8', '60s', 'Sin dolor'],
        ['Leg Press (pies neutros)', '3', '12', '60s', 'Gluteo'],
        ['Standing Leg Curl', '3', '12', '60s', ''],
        ['Cable Pull Through', '3', '10', '60s', ''],
        ['Dead Bug con extension', '3', '10', '45s', 'Core'],
        ['Side Plank', '3', '', '45s', 'Core'],
      ],
    },
    {
      name: 'Day 2: TREN SUPERIOR (FUERZA + METABOLICO)',
      exercises: [
        ['Incline Dumbbell Press', '4', '8', '60s', ''],
        ['Chest Supported Row', '4', '10', '60s', ''],
        ['Push Ups en banco', '3', '12', '45s', 'Superset'],
        ['Lat Pulldown agarre amplio', '3', '12', '45s', 'Superset'],
        ['Overhead Triceps Extension', '3', '12', '45s', ''],
        ['Hammer Curl', '3', '12', '45s', ''],
        ['Pallof Press', '3', '10', '45s', 'Core'],
      ],
    },
    {
      name: 'Day 3: POSTERIOR CHAIN (SEGURA)',
      exercises: [
        ['Hip Thrust con pausa', '3', '10', '45s', 'Activacion'],
        ['Curl femoral sentado', '3', '12', '45s', ''],
        ['Peso muerto rumano mancuernas', '4', '8', '75s', ''],
        ['Remo con cable', '3', '12', '60s', ''],
        ['Jalon neutro', '3', '12', '60s', ''],
        ['Face Pull', '3', '12', '45s', ''],
        ['Bird Dog con pausa', '3', '10', '45s', 'Core'],
      ],
    },
    {
      name: 'Day 4: QUEMA GRASA + FUNCIONAL SIN IMPACTO',
      exercises: [
        ['Bike / Eliptica', '3-4', '', '30s', 'Circuito'],
        ['Kettlebell Deadlift', '3-4', '12', '30s', ''],
        ['Battle Ropes', '3-4', '', '30s', ''],
        ['Farmer Walk', '3-4', '', '30s', 'Ligero'],
        ['Mountain Climbers (lento)', '3-4', '20', '30s', 'Sin impacto'],
      ],
    },
  ],
  3: [
    {
      name: 'Day 1: LOWER BODY CONTROLADO + CORE',
      exercises: [
        ['Hip Thrust', '4', '10', '60s', 'Activacion'],
        ['Seated Hamstring Curl', '3', '12', '45s', 'Ligero'],
        ['Banded Lateral Walk', '3', '15', '45s', 'Controlado'],
        ['Goblet Squat (tempo lento)', '4', '8', '60s', 'Sin dolor'],
        ['Leg Press (pies altos)', '3', '10', '60s', 'Gluteo'],
        ['Lying Leg Curl', '3', '10', '60s', ''],
        ['Cable Pull Through', '3', '12', '60s', ''],
        ['Dead Bug', '3', '12', '45s', 'Core'],
        ['Plank', '3', '', '45s', 'Core'],
      ],
    },
    {
      name: 'Day 2: TREN SUPERIOR (FUERZA + METABOLICO)',
      exercises: [
        ['Bench Press', '4', '5', '75s', ''],
        ['Chest Supported Row', '4', '8', '60s', ''],
        ['Push Ups inclinadas', '3', '15', '45s', 'Superset'],
        ['Lat Pulldown agarre neutro', '3', '10', '45s', 'Superset'],
        ['Dips asistidos', '3', '10', '45s', ''],
        ['Curl barra EZ', '3', '10', '45s', ''],
        ['Pallof Press', '3', '12', '45s', 'Core'],
      ],
    },
    {
      name: 'Day 3: POSTERIOR CHAIN (SEGURA)',
      exercises: [
        ['Hip Thrust con pausa', '3', '10', '45s', 'Activacion'],
        ['Curl femoral tumbado', '3', '12', '45s', ''],
        ['Trap Bar Deadlift', '4', '4', '75s', '70-75%'],
        ['Remo en maquina', '3', '10', '60s', ''],
        ['Jalon al pecho', '3', '10', '60s', ''],
        ['Face Pull', '3', '12', '45s', ''],
        ['Bird Dog', '3', '12', '45s', 'Core'],
      ],
    },
    {
      name: 'Day 4: QUEMA GRASA + FUNCIONAL SIN IMPACTO',
      exercises: [
        ['Bike / Eliptica', '4', '', '30s', 'Circuito'],
        ['Kettlebell Deadlift', '4', '12', '30s', ''],
        ['Battle Ropes', '4', '', '30s', ''],
        ['Farmer Walk', '4', '', '30s', 'Ligero'],
        ['Plank con toque hombro', '4', '20', '30s', 'Core'],
      ],
    },
  ],
  4: [
    {
      name: 'Day 1: LOWER BODY CONTROLADO + CORE',
      exercises: [
        ['Glute Bridge', '3', '12', '45s', 'Activacion'],
        ['Seated Hamstring Curl', '3', '12', '45s', 'Ligero'],
        ['Banded Lateral Walk', '3', '15', '45s', 'Controlado'],
        ['Goblet Squat', '3', '10', '60s', 'Suave'],
        ['Leg Press (pies altos)', '3', '12', '60s', 'Fluido'],
        ['Lying Leg Curl', '3', '12', '60s', ''],
        ['Cable Pull Through', '3', '12', '60s', ''],
        ['Dead Bug', '3', '10', '45s', 'Core'],
        ['Plank', '3', '', '45s', 'Core'],
      ],
    },
    {
      name: 'Day 2: TREN SUPERIOR (FUERZA + METABOLICO)',
      exercises: [
        ['Incline Dumbbell Press', '3', '10', '60s', 'Controlado'],
        ['Chest Supported Row', '3', '10', '60s', ''],
        ['Push Ups inclinadas', '3', '12', '45s', ''],
        ['Lat Pulldown neutro', '3', '12', '45s', ''],
        ['Triceps Pushdown', '3', '12', '45s', ''],
        ['Hammer Curl', '3', '12', '45s', ''],
        ['Pallof Press', '3', '10', '45s', 'Core'],
      ],
    },
    {
      name: 'Day 3: POSTERIOR CHAIN (SEGURA)',
      exercises: [
        ['Hip Thrust', '3', '12', '45s', 'Activacion'],
        ['Curl femoral sentado', '3', '12', '45s', ''],
        ['Peso muerto rumano mancuernas', '3', '10', '60s', 'Suave'],
        ['Remo maquina', '3', '12', '60s', ''],
        ['Jalon al pecho', '3', '12', '60s', ''],
        ['Face Pull', '3', '12', '45s', ''],
        ['Bird Dog', '3', '10', '45s', 'Core'],
      ],
    },
    {
      name: 'Day 4: QUEMA GRASA + FUNCIONAL SIN IMPACTO',
      exercises: [
        ['Bike / Eliptica', '3', '', '30s', 'Fluido'],
        ['Kettlebell Deadlift', '3', '12', '30s', ''],
        ['Battle Ropes', '3', '', '30s', ''],
        ['Farmer Walk', '3', '', '30s', 'Ligero'],
        ['Plank', '3', '', '30s', 'Core'],
      ],
    },
  ],
}

const createExercise = (weekNumber, dayNumber, [exercise, sets, reps, rest, notes], index) => ({
  id: `w${weekNumber}-d${dayNumber}-e${index + 1}`,
  exercise,
  sets,
  reps,
  weight: '',
  rest,
  notes,
  completed: false,
})

const createDay = (weekNumber, day, dayIndex) => ({
  id: `w${weekNumber}-d${dayIndex + 1}`,
  name: day.name,
  exercises: day.exercises.map((exercise, index) =>
    createExercise(weekNumber, dayIndex + 1, exercise, index),
  ),
})

export const initialPlan = {
  weeks: [1, 2, 3, 4].map((weekNumber) => ({
    id: `week-${weekNumber}`,
    name: `Week ${weekNumber}`,
    days: weekTemplates[weekNumber].map((day, dayIndex) => createDay(weekNumber, day, dayIndex)),
  })),
}
