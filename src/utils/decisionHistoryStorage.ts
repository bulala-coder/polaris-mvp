import {
  readFromStorage,
  removeFromStorage,
  storageKeys,
  writeToStorage,
} from './storage'
import type {
  CreateDecisionHistoryEntryInput,
  DecisionHistoryEntry,
} from '../types/decisionHistory'

function isDecisionHistoryEntryArray(
  value: unknown,
): value is DecisionHistoryEntry[] {
  return Array.isArray(value)
}

export function createDecisionHistoryEntry(
  input: CreateDecisionHistoryEntryInput,
): DecisionHistoryEntry {
  const { decisionOutput, portfolioSnapshot, marketSnapshot, userPositionSnapshot } =
    input

  return {
    id: `decision-${Date.now()}`,
    createdAt: new Date().toISOString(),
    decisionLabel: decisionOutput.decisionLabel,
    riskLevel: decisionOutput.riskLevel,
    summary: decisionOutput.summary,
    reasons: decisionOutput.reasons,
    recommendedActions: decisionOutput.recommendedActions,
    notRecommendedActions: decisionOutput.notRecommendedActions,
    trustNotice: decisionOutput.trustNotice,
    portfolioSnapshot,
    marketSnapshot,
    userPositionSnapshot,
  }
}

export function readDecisionHistory(): DecisionHistoryEntry[] {
  const entries = readFromStorage<unknown>(storageKeys.decisionHistory, [])

  if (!isDecisionHistoryEntryArray(entries)) {
    return []
  }

  return entries
}

export function writeDecisionHistory(entries: DecisionHistoryEntry[]): void {
  writeToStorage(storageKeys.decisionHistory, entries)
}

export function addDecisionHistoryEntry(
  input: CreateDecisionHistoryEntryInput,
): DecisionHistoryEntry[] {
  const entry = createDecisionHistoryEntry(input)
  const entries = [entry, ...readDecisionHistory()]

  writeDecisionHistory(entries)

  return entries
}

export function clearDecisionHistory(): void {
  removeFromStorage(storageKeys.decisionHistory)
}
