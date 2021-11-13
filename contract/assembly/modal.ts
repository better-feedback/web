import { context } from 'near-sdk-as'

@nearBindgen
export class BetterDAO {
  name: string
  owner: string
  url: string
  description: string

  create(name: string, url: string, description: string) {
    self.name = name
    self.url = url
    self.description = description
    self.owner = context.sender
  }
}
