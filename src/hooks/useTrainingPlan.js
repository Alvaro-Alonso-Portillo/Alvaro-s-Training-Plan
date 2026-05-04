import { useEffect, useEffectEvent, useState } from 'react'
import { localStorageProvider } from '../lib/storage/localStorage'
import {
  pushPlanToGoogleSheets,
  syncPlanFromGoogleSheets,
} from '../lib/sheets/syncFromGoogleSheets'

export function useTrainingPlan() {
  const [plan, setPlan] = useState(() => localStorageProvider.loadPlan())
  const [syncMeta, setSyncMeta] = useState({ loading: false, message: '' })
  const [pushMeta, setPushMeta] = useState({ loading: false, message: '' })

  useEffect(() => {
    localStorageProvider.savePlan(plan)
  }, [plan])

  const updateExercise = (weekId, dayId, exerciseId, field, value) => {
    setPlan((current) => ({
      ...current,
      weeks: current.weeks.map((week) =>
        week.id !== weekId
          ? week
          : {
              ...week,
              days: week.days.map((day) =>
                day.id !== dayId
                  ? day
                  : {
                      ...day,
                      exercises: day.exercises.map((exercise) =>
                        exercise.id !== exerciseId
                          ? exercise
                          : {
                              ...exercise,
                              [field]: value,
                            },
                      ),
                    },
              ),
            },
      ),
    }))
  }

  const resetPlan = () => {
    setPlan(localStorageProvider.resetPlan())
  }

  const syncFromSheet = async () => {
    setSyncMeta({ loading: true, message: 'Sincronizando semanas desde el Excel...' })

    const result = await syncPlanFromGoogleSheets(plan)

    if (result.changed) {
      setPlan(result.plan)
      setSyncMeta({
        loading: false,
        message: `Sincronizacion completa: ${result.weeksFound} semanas cargadas.`,
      })
      return
    }

    setSyncMeta({
      loading: false,
      message:
        result.weeksFound > 0
          ? `No hubo cambios. Semanas detectadas: ${result.weeksFound}.`
          : 'No se encontraron semanas nuevas en el Excel.',
    })
  }

  const saveToSheet = async () => {
    setPushMeta({ loading: true, message: 'Guardando progreso en Excel...' })
    const result = await pushPlanToGoogleSheets(plan)
    setPushMeta({ loading: false, message: result.message })
  }

  const syncOnMount = useEffectEvent(() => {
    void syncFromSheet()
  })

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      syncOnMount()
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [])

  return {
    plan,
    updateExercise,
    resetPlan,
    syncFromSheet,
    syncMeta,
    saveToSheet,
    pushMeta,
  }
}
