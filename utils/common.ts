import PubSub from 'pubsub-js'
import { BetterDAO, IssueCategory, Status, ToastType } from '../type'
import {
  acceptFeedback,
  completeFeedback,
  rejectFeedback,
  startFeedback,
} from './contract'

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
        text: 'Under review',
        actionName: '',
        color: 'status-unknown',
        actions: [
          {
            icon: 'CheckCircle',
            nextStatus: Status.Planned,
            call: acceptFeedback,
          },
          {
            icon: 'XCircle',
            nextStatus: Status.Closed,
            call: rejectFeedback,
          },
        ],
      }
    case Status.Planned:
      return {
        text: 'Accepted',
        actionName: 'Accept',
        color: 'rgba(0, 140, 213, 0.5)',
        actions: [
          {
            icon: 'PlayCircle',
            nextStatus: Status.InProgress,
            call: startFeedback,
          },
        ],
      }
    case Status.Closed:
      return {
        text: 'Rejected',
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
            call: completeFeedback,
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
