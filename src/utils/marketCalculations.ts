import type {
  MarketCategoryScore,
  MarketInput,
  MarketRiskLevel,
  MarketScore,
} from '../types/market'

const categoryDefinitions = [
  {
    key: 'valuation',
    label: '估值｜Valuation',
    helperText: '估值',
    scoreKey: 'valuationScore',
    weight: 0.2,
  },
  {
    key: 'momentum',
    label: '動能｜Momentum',
    helperText: '動能',
    scoreKey: 'momentumScore',
    weight: 0.15,
  },
  {
    key: 'volatility',
    label: '波動｜Volatility',
    helperText: '波動度',
    scoreKey: 'volatilityScore',
    weight: 0.15,
  },
  {
    key: 'interestRate',
    label: '利率｜Interest Rate',
    helperText: '利率環境',
    scoreKey: 'interestRateScore',
    weight: 0.15,
  },
  {
    key: 'businessCycle',
    label: '景氣｜Business Cycle',
    helperText: '景氣循環',
    scoreKey: 'businessCycleScore',
    weight: 0.15,
  },
  {
    key: 'creditRisk',
    label: '信用風險｜Credit Risk',
    helperText: '信用風險',
    scoreKey: 'creditRiskScore',
    weight: 0.1,
  },
  {
    key: 'sentiment',
    label: '市場情緒｜Sentiment',
    helperText: '市場情緒',
    scoreKey: 'sentimentScore',
    weight: 0.1,
  },
] as const

const marketRiskLabels: Record<MarketRiskLevel, string> = {
  1: '低風險',
  2: '中性偏低',
  3: '中性偏高',
  4: '高風險',
  5: '極高風險',
}

function buildCategoryScores(input: MarketInput): MarketCategoryScore[] {
  return categoryDefinitions.map((category) => {
    const value = input[category.scoreKey]

    return {
      key: category.key,
      label: category.label,
      value,
      helperText: category.helperText,
      description: category.helperText,
      score: value,
      weight: category.weight,
    }
  })
}

export function calculateMarketRiskScore(input: MarketInput): number {
  return buildCategoryScores(input).reduce(
    (sum, category) => sum + category.value * category.weight,
    0,
  )
}

export function calculateMarketRiskLevel(score: number): MarketRiskLevel {
  if (score <= 20) {
    return 1
  }

  if (score <= 40) {
    return 2
  }

  if (score < 61) {
    return 3
  }

  if (score <= 80) {
    return 4
  }

  return 5
}

export function getMarketRiskLabel(level: MarketRiskLevel) {
  return marketRiskLabels[level]
}

export function getSimpleMarketRisk(marketRiskLevel: number): {
  label: string
  tone: 'low' | 'medium' | 'high'
  description: string
} {
  if (marketRiskLevel <= 2) {
    return {
      label: '低風險',
      tone: 'low',
      description:
        '目前市場環境相對穩定，可以依原計畫前進。不需要開香檳，也不用突然改航線。',
    }
  }

  if (marketRiskLevel === 3) {
    return {
      label: '中風險',
      tone: 'medium',
      description:
        '市場有點熱，先別急著衝刺。適合維持紀律，不宜過度加碼。',
    }
  }

  return {
    label: '高風險',
    tone: 'high',
    description: '風浪偏大，先顧好船身。控制曝險與現金安全，比追求速度更重要。',
  }
}

export function buildMarketScore(input: MarketInput): MarketScore {
  const categoryScores = buildCategoryScores(input)
  const marketRiskScore = calculateMarketRiskScore(input)
  const marketRiskLevel = calculateMarketRiskLevel(marketRiskScore)

  return {
    ...input,
    marketRiskScore,
    marketRiskLevel,
    marketRiskLabel: getMarketRiskLabel(marketRiskLevel),
    categoryScores,
    mainRiskDrivers: [...categoryScores]
      .sort((first, second) => second.value - first.value)
      .slice(0, 3),
  }
}
