import { Profile } from "./Account.js"


export class TowerEvent {
  constructor(data) {

    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate).toLocaleDateString()
    this.isCanceled = data.isCanceled
    this.type = data.type
    this.creatorId = data.creatorId
    this.creator = data.creator ? new Profile(data.creator) : null

  }
}

export class MyEvent extends TowerEvent {
  constructor(data) {
    super(data)

    this.attendeeId = data.id
  }
}