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

export const StatusList = [
  'Open',
  'Planned',
  'Closed',
  'InProgress',
  'Completed',
]

export type BetterDAO = {
  name: string
  projectUrl: string
  logoUrl: string
  description: string
  categories?: string[]
  createdAt?: string
  createdBy?: string
}

export type IssueCreation = {
  title: string
  description: string
  category: string
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
  status: Status
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

export enum DAOMethod {
  getDAO = 'getDAO',
  getIssues = 'getIssues',
  getIssue = 'getIssue',
  getLikes = 'getLikes',
  getLogs = 'getLogs',
  getDAOInfo = 'getDAOInfo',
  getCouncil = 'getCouncil',
  getCategories = 'getCategories',
  getIssuesByStatus = 'getIssuesByStatus',
  getIssuesByCategory = 'getIssuesByCategory',
  getIssuesCountByStatus = 'getIssuesCountByStatus',
  getIssuesCountByCategory = 'getIssuesCountByCategory',

  createIssue = 'createIssue',
  likeIssue = 'likeIssue',
  approveIssue = 'approveIssue',
  closeIssue = 'closeIssue',
  startIssue = 'startIssue',
  completeIssue = 'completeIssue',
}
