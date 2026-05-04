import { initialPlan } from '../../data/initialPlan'

const STORAGE_KEY = 'alvaro-training-plan-v1'

export const localStorageProvider = {
  loadPlan() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPlan))
      return initialPlan
    }

    try {
      return JSON.parse(raw)
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPlan))
      return initialPlan
    }
  },

  savePlan(plan) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
  },

  resetPlan() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPlan))
    return initialPlan
  },
}
