export type Metadata = {
  bounties: {
    chain: string
    bountyId: number
  }[]
}

export type ReqParams = {
  perPage?: number
  page?: number
}
