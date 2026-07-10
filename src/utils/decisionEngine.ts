import type { DecisionOutput } from '../types/decisionOutput'
import type { MarketScore } from '../types/market'
import type { Portfolio } from '../types/portfolio'
import type { UserPosition, UserRiskCapacity } from '../types/userPosition'

const trustNotice =
  'Polaris v0.2.5 uses local prototype data from Portfolio, Market, and User Position. It does not provide financial advice, stock recommendations, short-term trading signals, market predictions, or guaranteed investment outcomes.'

type GenerateTodayDecisionParams = {
  portfolio: Portfolio
  marketScore: MarketScore
  userPosition: UserPosition
  userRiskCapacity: UserRiskCapacity
}

export function generateTodayDecision({
  portfolio,
  marketScore,
  userPosition,
  userRiskCapacity,
}: GenerateTodayDecisionParams): DecisionOutput {
  if (userPosition.cashReserveMonths < 6) {
    return {
      decisionLabel: 'Prioritize cash safety',
      riskLevel: 4,
      summary:
        'Your cash reserve is below the safety threshold. Before increasing exposure, rebuild liquidity.',
      reasons: [
        'Cash reserve is below the safety threshold.',
        'Liquidity risk should be reviewed before exposure changes.',
        ...userRiskCapacity.reasons.slice(0, 2),
      ],
      recommendedActions: [
        'Review monthly contribution and emergency cash reserve.',
        'Avoid increasing risky exposure until cash reserve improves.',
      ],
      notRecommendedActions: [
        'Do not increase exposure only because the market looks attractive.',
        'Do not ignore liquidity risk.',
      ],
      trustNotice,
    }
  }

  if (userPosition.usesLeverage && portfolio.effectiveExposure > 1.3) {
    return {
      decisionLabel: 'Reduce leverage pressure',
      riskLevel: 4,
      summary:
        'Effective exposure is elevated while leverage is being used. Risk control should come before adding more exposure.',
      reasons: [
        'Leverage is enabled in User Position.',
        'Effective exposure is above the elevated threshold.',
        'Risk control should be reviewed before increasing exposure.',
      ],
      recommendedActions: [
        'Review whether current exposure still matches your long-term plan.',
        'Consider using new cash flow to reduce exposure pressure.',
      ],
      notRecommendedActions: [
        'Do not add leverage in response to short-term optimism.',
        'Do not treat high exposure as normal without a clear plan.',
      ],
      trustNotice,
    }
  }

  if (userRiskCapacity.level === 'low' && portfolio.effectiveExposure > 1) {
    return {
      decisionLabel: 'Align exposure with risk capacity',
      riskLevel: 4,
      summary:
        'Current exposure may be higher than your risk capacity. Recheck whether your allocation still fits your life context.',
      reasons: [
        'Risk capacity is currently low.',
        'Effective exposure is above 100%.',
        'Risk capacity and exposure may not be aligned.',
      ],
      recommendedActions: [
        'Review investment horizon, cash reserve, and drawdown tolerance.',
        'Consider lowering exposure gradually instead of making emotional changes.',
      ],
      notRecommendedActions: [
        'Do not keep high exposure only because it worked before.',
        'Do not ignore personal risk capacity.',
      ],
      trustNotice,
    }
  }

  if (marketScore.marketRiskLevel >= 5) {
    return {
      decisionLabel: 'Defensive review needed',
      riskLevel: 5,
      summary:
        'Market risk is extremely high. Polaris recommends reviewing exposure and avoiding aggressive increases.',
      reasons: [
        'Market risk is at an extremely high level.',
        'Exposure and cash reserve should be reviewed together.',
        'Aggressive increases are not aligned with risk control.',
      ],
      recommendedActions: [
        'Review portfolio exposure and cash reserve.',
        'Avoid aggressive increases until risk level falls.',
      ],
      notRecommendedActions: [
        'Do not chase returns in an overheated environment.',
        'Do not make large moves without checking your plan.',
      ],
      trustNotice,
    }
  }

  if (portfolio.totalDrift > 0.08) {
    return {
      decisionLabel: 'Rebalance with discipline',
      riskLevel: 3,
      summary:
        'Portfolio allocation has drifted from target. Rebalancing can help restore your original plan.',
      reasons: [
        'Portfolio allocation has drifted from target.',
        'Rebalancing can restore the original plan.',
        'New contributions may reduce unnecessary trading.',
      ],
      recommendedActions: [
        'Use new contributions first when possible.',
        'Review assets with the largest drift before selling.',
      ],
      notRecommendedActions: [
        'Do not rebalance based on market noise alone.',
        'Do not overtrade small allocation differences.',
      ],
      trustNotice,
    }
  }

  return {
    decisionLabel: 'Maintain strategy',
    riskLevel: marketScore.marketRiskLevel,
    summary:
      'No major strategy change is required today. Continue following the long-term plan with discipline.',
    reasons: [
      'Portfolio drift is within a manageable range.',
      'Market risk does not require a defensive shift.',
      'User position does not require immediate exposure reduction.',
    ],
    recommendedActions: [
      'Continue regular contribution if it fits your plan.',
      'Review portfolio and market context periodically.',
    ],
    notRecommendedActions: [
      'Do not change allocation because of single-day market movement.',
      'Do not use Polaris as a short-term trading signal.',
    ],
    trustNotice,
  }
}
