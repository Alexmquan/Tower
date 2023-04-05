import { Profile } from "./Account.js"
import { TowerEvent } from "./TowerEvent.js"

export class Attendee {
  constructor(data) {
    this.eventId = data.eventId
    this.accountId = data.accountId
    this.profile = new Profile(data.profile)
    this.event = new TowerEvent(data.event)
  }
}