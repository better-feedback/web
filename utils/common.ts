import PubSub from 'pubsub-js'
import { FeedbackTag, Status, ToastType } from '../type'
import {
  acceptFeedback,
  completeFeedback,
  rejectFeedback,
  startFeedback,
} from './contract'

export const toast = (type: ToastType, message: string) => {
  PubSub.publish('toast', {
    type,
    message,
  })
}

export const getTagColor = (tag: FeedbackTag) => {
  switch (tag) {
    case FeedbackTag.BUG:
      return 'status-error'
    case FeedbackTag.FEATURE_REQUEST:
      return 'status-warning'
    case FeedbackTag.SUGGESTION:
      return 'status-ok'
    default:
      return 'dark-3'
  }
}

export const getStatusConfig = (status: Status) => {
  switch (status) {
    case Status.UnderReview:
      return {
        text: 'Under review',
        actionName: '',
        color: 'status-unknown',
        actions: [
          {
            icon: 'CheckCircle',
            nextStatus: Status.Accepted,
            call: acceptFeedback,
          },
          {
            icon: 'XCircle',
            nextStatus: Status.Rejected,
            call: rejectFeedback,
          },
        ],
      }
    case Status.Accepted:
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
    case Status.Rejected:
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
