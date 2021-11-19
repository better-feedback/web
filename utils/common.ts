import PubSub from 'pubsub-js'
import BN from 'bn.js'
import {
  BetterDAO,
  Fund,
  Issue,
  IssueCategory,
  IssueCreation,
  Status,
  ToastType,
} from '../type'
import { approveIssue, completeIssue, closeIssue, startIssue } from './contract'

export const validateIssueForm = (issue: IssueCreation): boolean => {
  if (!issue.title.trim()) {
    toast(ToastType.ERROR, 'Invalid title')
    return false
  }
  if (!issue.description.trim()) {
    toast(ToastType.ERROR, 'Invalid description')
    return false
  }
  if (issue.title.length > 100) {
    toast(ToastType.ERROR, 'Title is too long')
    return false
  }
  if (issue.description.length > 1000) {
    toast(ToastType.ERROR, 'Description is too long')
    return false
  }
  return true
}

export const validateDAOForm = (dao: BetterDAO): boolean => {
  if (!/^[a-z1-9_-]{1,13}$/.test(dao.name)) {
    toast(ToastType.ERROR, 'Invalid DAO name')
    return false
  }

  if (
    dao.projectUrl &&
    !/^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/.test(
      dao.projectUrl
    )
  ) {
    toast(ToastType.ERROR, 'Invalid project url')
    return false
  }

  if (
    dao.logoUrl &&
    !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|svg)/.test(dao.logoUrl)
  ) {
    toast(ToastType.ERROR, 'Invalid logo url')
    return false
  }

  if (dao.description.length > 200) {
    toast(ToastType.ERROR, 'Description too long')
    return false
  }

  if (dao.categories.some((t) => !t)) {
    toast(ToastType.ERROR, 'Invalid categories')
    return false
  }

  return true
}

export const toast = (type: ToastType, message: string) => {
  PubSub.publish('toast', {
    type,
    message,
  })
}

export const getTagColor = (tag: IssueCategory) => {
  switch (tag) {
    case IssueCategory.BUG:
      return 'status-error'
    case IssueCategory.FEATURE_REQUEST:
      return 'status-warning'
    case IssueCategory.UI:
      return 'status-ok'
    default:
      return 'dark-3'
  }
}

export const getStatusConfig = (status: Status) => {
  switch (status) {
    case Status.Open:
      return {
        text: 'Open',
        actionName: '',
        color: 'status-unknown',
        actions: [
          {
            icon: 'CheckCircle',
            nextStatus: Status.Planned,
            call: approveIssue,
          },
          {
            icon: 'XCircle',
            nextStatus: Status.Closed,
            call: closeIssue,
          },
        ],
      }
    case Status.Planned:
      return {
        text: 'Planned',
        actionName: 'Accept',
        color: 'rgba(0, 140, 213, 0.5)',
        actions: [
          {
            icon: 'PlayCircle',
            nextStatus: Status.InProgress,
            call: startIssue,
          },
        ],
      }
    case Status.Closed:
      return {
        text: 'Closed',
        actionName: 'Reject',
        color: 'dark-1',
        icons: [],
        actions: [],
      }
    case Status.InProgress:
      return {
        text: 'In progress',
        actionName: 'Start',
        color: 'rgba(0, 135, 61, 0.5)',
        actions: [
          {
            icon: 'Archive',
            nextStatus: Status.Completed,
            call: completeIssue,
          },
        ],
      }
    case Status.Completed:
      return {
        text: 'Completed',
        actionName: 'Finish',
        color: 'rgba(255, 64, 64, 0.5)',
        icons: [],
        actions: [],
      }
    default:
      return {
        text: '',
        color: '',
        icons: [],
        actions: [],
      }
  }
}

export const getDAOName = (name: string) => {
  if (!name) {
    return ''
  }
  return name.split('.')[0]
}

export function hexToRGB(hex) {
  return hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16))
}

export function calcFund(funds: Fund[]): string {
  let total = new BN(0)
  for (let index = 0; index < funds.length; index++) {
    total.iadd(new BN(funds[index].amount))
  }
  return total.toString()
}
