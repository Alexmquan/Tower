import { Profile } from "./Account.js"

export class Comment {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.id
    this.eventId = data.eventId
    this.body = data.body
    this.creator = new Profile(data.creator)
  }
}