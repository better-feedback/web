import dayjs from 'dayjs'

export const formatTimestamp = (
  timestamp: number | string,
  fmt = 'MMM DD, YYYY'
): string => {
  if (!Number(timestamp)) {
    return 'unknown'
  }
  return dayjs(Number(timestamp) / 1000000).format(fmt)
}
