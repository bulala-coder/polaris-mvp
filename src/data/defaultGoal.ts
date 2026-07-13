import type { GoalSettings } from '../types/goal'

export const defaultGoal: GoalSettings = {
  currentNetWorth: 20000000,
  targetNetWorth: 50000000,
  monthlyContribution: 20000,
  maxExposure: 1.5,
  expectedAnnualReturn: 0.06,
  stockWeight: 0.4,
  leveragedStockWeight: 0.4,
  bondWeight: 0.15,
  cashWeight: 0.05,
}
