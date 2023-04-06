import { Profile } from "./Account.js"
import { MyEvent, TowerEvent } from "./TowerEvent.js"

export class Attendee {
  constructor(data) {
    this.id = data.id

    this.eventId = data.eventId
    this.accountId = data.accountId
    // this.profile = new Profile(data.profile)
    this.event = new MyEvent(data.event)
  }
}