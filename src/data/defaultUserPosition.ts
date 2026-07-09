import type { UserPosition } from '../types/userPosition'

export const defaultUserPosition: UserPosition = {
  age: 35,
  investmentHorizonYears: 20,
  monthlyContribution: 20000,
  cashReserveMonths: 12,
  maxAcceptableDrawdown: 35,
  usesLeverage: true,
}
