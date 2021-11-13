export type BetterDAO = {
  name: string
  owner: string
  url: string
  logoUrl: string
  description: string
  createdAt: string
}

export type BetterBounty = {
  id: string
  title: string
  description: string
  likes: string[]
  funders: any[]
  createdAt: string
  creator: string
}
