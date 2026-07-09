export type ReflectionEmotion =
  | 'calm'
  | 'anxious'
  | 'afraid'
  | 'greedy'
  | 'regretful'
  | 'hesitant'
  | 'relieved'
  | 'impulsive'

export type ReflectionEntry = {
  date: string
  decisionLabel: string
  emotion: ReflectionEmotion
  followedStrategy: boolean
  note: string
}
