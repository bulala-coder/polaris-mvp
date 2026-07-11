import type { DecisionOutput } from '../types/decisionOutput'
import type { MarketScore } from '../types/market'
import type { Portfolio } from '../types/portfolio'
import type { UserPosition, UserRiskCapacity } from '../types/userPosition'

const trustNotice =
  'Polaris v0.2.7 使用本機原型資料，包括 Portfolio、Market 與 User Position。Polaris 不提供財務建議、個股推薦、短線交易訊號、市場預測或保證投資結果。'

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
      decisionLabel: '優先補強現金安全水位',
      riskLevel: 4,
      summary:
        '你的現金安全水位低於門檻。在增加曝險前，應先補強流動性。',
      reasons: [
        '現金安全水位低於安全門檻。',
        '在調整曝險前，應先檢查流動性風險。',
        ...userRiskCapacity.reasons.slice(0, 2),
      ],
      recommendedActions: [
        '檢查每月投入金額與緊急預備金是否足夠。',
        '在現金安全水位改善前，避免增加高風險曝險。',
      ],
      notRecommendedActions: [
        '不要只因市場看起來有吸引力就增加曝險。',
        '不要忽略流動性風險。',
      ],
      trustNotice,
    }
  }

  if (userPosition.usesLeverage && portfolio.effectiveExposure > 1.3) {
    return {
      decisionLabel: '降低槓桿曝險壓力',
      riskLevel: 4,
      summary:
        '目前使用槓桿且有效曝險偏高。在增加曝險前，應先確認風險控制是否仍符合原本計畫。',
      reasons: [
        'User Position 顯示目前使用槓桿。',
        '投資組合有效曝險高於警戒門檻。',
        '在增加曝險前，應先檢查風險控制。',
      ],
      recommendedActions: [
        '檢查目前曝險是否仍符合長期配置計畫。',
        '可優先用新的現金流降低曝險壓力。',
      ],
      notRecommendedActions: [
        '不要因短期樂觀情緒而增加槓桿。',
        '不要在缺乏清楚計畫時，把高曝險視為常態。',
      ],
      trustNotice,
    }
  }

  if (userRiskCapacity.level === 'low' && portfolio.effectiveExposure > 1) {
    return {
      decisionLabel: '讓曝險符合自身風險承受能力',
      riskLevel: 4,
      summary:
        '目前曝險可能高於你的風險承受能力。請重新檢查配置是否仍符合生活脈絡與長期計畫。',
      reasons: [
        '目前風險承受能力偏低。',
        '有效曝險高於 100%。',
        '個人風險承受能力與投資曝險可能不一致。',
      ],
      recommendedActions: [
        '檢查投資期限、現金安全水位與可接受回撤。',
        '若需要降低曝險，優先採取漸進方式，避免情緒化調整。',
      ],
      notRecommendedActions: [
        '不要只因過去有效，就持續維持高曝險。',
        '不要忽略自身風險承受能力。',
      ],
      trustNotice,
    }
  }

  if (marketScore.marketRiskLevel >= 5) {
    return {
      decisionLabel: '需要進行防守型檢查',
      riskLevel: 5,
      summary:
        '市場風險處於極高區間。Polaris 建議檢查曝險與現金水位，並避免積極增加曝險。',
      reasons: [
        '市場風險處於極高等級。',
        '曝險與現金安全水位應一起檢查。',
        '積極增加曝險不符合風險控制原則。',
      ],
      recommendedActions: [
        '檢查投資組合曝險與現金安全水位。',
        '在風險等級下降前，避免積極增加曝險。',
      ],
      notRecommendedActions: [
        '不要在過熱環境中追逐報酬。',
        '不要在未檢查原本計畫前做出大幅調整。',
      ],
      trustNotice,
    }
  }

  if (portfolio.totalDrift > 0.08) {
    return {
      decisionLabel: '依照紀律再平衡',
      riskLevel: 3,
      summary:
        '投資組合配置已偏離目標。再平衡可以幫助配置回到原本計畫。',
      reasons: [
        '投資組合配置已偏離目標比例。',
        '再平衡有助於回到原本配置計畫。',
        '優先使用新資金可減少不必要交易。',
      ],
      recommendedActions: [
        '可行時，優先使用新的投入資金調整配置。',
        '在賣出前，先檢查偏離最大的資產是否仍符合長期策略。',
      ],
      notRecommendedActions: [
        '不要只因市場雜訊而再平衡。',
        '不要因小幅配置差異而過度交易。',
      ],
      trustNotice,
    }
  }

  return {
    decisionLabel: '維持原定策略',
    riskLevel: marketScore.marketRiskLevel,
    summary:
      '今天不需要大幅改變策略。請繼續依照長期計畫，保持紀律執行。',
    reasons: [
      '投資組合偏離仍在可管理範圍內。',
      '目前市場風險尚未要求切換為防守模式。',
      'User Position 未顯示需要立即降低曝險。',
    ],
    recommendedActions: [
      '若符合原本計畫，可持續定期投入。',
      '定期檢查投資組合與市場風險背景。',
    ],
    notRecommendedActions: [
      '不要因單日市場波動改變配置。',
      '不要把 Polaris 當作短線買賣訊號。',
    ],
    trustNotice,
  }
}
