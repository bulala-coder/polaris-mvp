export type UserPosition = {
  age: number
  investmentHorizonYears: number
  monthlyContribution: number
  cashReserveMonths: number
  maxAcceptableDrawdown: number
  usesLeverage: boolean
}

export type UserRiskCapacityLevel = 'low' | 'medium' | 'high'

export type UserRiskCapacity = {
  score: number
  level: UserRiskCapacityLevel
  reasons: string[]
}
