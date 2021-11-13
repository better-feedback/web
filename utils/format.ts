import dayjs from 'dayjs'

export const formatTimestamp = (timestamp: number | string): string => {
  if (!Number(timestamp)) {
    return 'unknown'
  }
  return dayjs(Number(timestamp) / 1000000).format('MMM DD, YYYY')
}
