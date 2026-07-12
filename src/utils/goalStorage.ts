import { defaultGoal } from '../data/defaultGoal'
import type { GoalSettings } from '../types/goal'
import {
  readFromStorage,
  removeFromStorage,
  storageKeys,
  writeToStorage,
} from './storage'

export function readGoalSettings(): GoalSettings {
  const storedGoalSettings = readFromStorage<Partial<GoalSettings>>(
    storageKeys.goalSettings,
    {},
  )

  return {
    ...defaultGoal,
    ...storedGoalSettings,
  }
}

export function writeGoalSettings(goalSettings: GoalSettings): void {
  writeToStorage(storageKeys.goalSettings, goalSettings)
}

export function resetGoalSettings(): GoalSettings {
  removeFromStorage(storageKeys.goalSettings)

  return { ...defaultGoal }
}
