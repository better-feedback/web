export enum Status {
  UnderReview,
  Accepted,
  Rejected,
  InProgress,
  Completed,
}

export type BetterDAO = {
  name: string
  projectUrl: string
  logoUrl: string
  description: string
  createdAt?: string
}

export type BetterBounty = {
  id: string
  title: string
  description: string
  likes: string[]
  funders: any[]
  tags: string[]
  createdAt: string
  creator: string
}

export type Fund = {
  amount: number
  funder: string
}

export type Log = {
  timestamp: string
  message: string
  status: Status
  sender: string
}

export type FeedbackType = {
  id: number
  title: string
  description: string
  tags: string[]
  createdAt: number
  createdBy: string
  likes: string[]
  status: Status
  hunter: string[]
  funds: Fund[]
  logs: Log[]
}
