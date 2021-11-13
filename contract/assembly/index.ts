import { storage, logging, PersistentMap, context } from 'near-sdk-as'

const LikesMap = new PersistentMap<string, Array<string>>('issue-map')

export function likeIssue(issueId: string): void {
  var currentLikes = LikesMap.get(issueId, null)
  if (currentLikes === null) {
    LikesMap.set(issueId, [context.sender])
  } else if (currentLikes.includes(context.sender)) {
    logging.log('Already liked this issue')
    return
  } else {
    currentLikes.push(context.sender)
  }
}

export function getIssueLikes(issueId: string): string[] {
  const currentLikes = LikesMap.get(issueId, null)
  if (currentLikes === null) {
    return []
  } else {
    return currentLikes
  }
}

export function incrementCounter(value: i32): void {
  const newCounter = storage.getPrimitive<i32>('counter', 0) + value
  storage.set<i32>('counter', newCounter)
  logging.log('Counter is now: ' + newCounter.toString())
}

export function decrementCounter(value: i32): void {
  const newCounter = storage.getPrimitive<i32>('counter', 0) - value
  storage.set<i32>('counter', newCounter)
  logging.log('Counter is now: ' + newCounter.toString())
}

export function getCounter(): i32 {
  return storage.getPrimitive<i32>('counter', 0)
}

export function resetCounter(): void {
  storage.set<i32>('counter', 0)
  logging.log('Counter is reset!')
}
