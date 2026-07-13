import type { GoalSettings } from '../types/goal'

export const defaultGoal: GoalSettings = {
  currentNetWorth: 0,
  targetNetWorth: 0,
  monthlyContribution: 0,
  maxExposure: 1,
  expectedAnnualReturn: 0,
  stockWeight: 0,
  leveragedStockWeight: 0,
  bondWeight: 0,
  cashWeight: 0,
  holdings: [],
}
