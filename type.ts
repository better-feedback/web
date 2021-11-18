export enum ToastType {
  ERROR,
  SUCCESS,
}

export type Toaster = {
  type: ToastType
  message: string
}

export enum IssueCategory {
  BUG = 'Bug',
  FEATURE_REQUEST = 'Feature Request',
  UI = 'UI',
  OTHER = 'Other',
  SMART_CONTRACT = 'Smart Contract',
}

export enum Status {
  Open,
  Planned,
  Closed,
  InProgress,
  Completed,
}

export type BetterDAO = {
  name: string
  projectUrl: string
  logoUrl: string
  description: string
  categories?: string[]
  createdAt?: string
  createdBy?: string
}

export type Issue = {
  id: number
  title: string
  description: string
  likes: string[]
  funders: any[]
  tags: string[]
  createdAt: string
  createdBy: string
  creator: string
  category: string
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

export type IssueType = {
  id: number
  title: string
  description: string
  tags: IssueCategory[]
  createdAt: number
  createdBy: string
  likes: string[]
  status: Status
  hunter: string[]
  funds: Fund[]
  logs: Log[]
}
