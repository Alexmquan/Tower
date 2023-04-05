import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
class TowerEventsService {

  async createEvent(eventData) {
    const event = await dbContext.TowerEvents.create(eventData)
    await event.populate("creator", 'picture name')
    return event
  }

  async getAllEvents() {
    const events = await dbContext.TowerEvents.find()
      .populate("creator", 'picture name')
    // FIXME may need to add another populate here
    return events
  }
  async getSingleEvent(eventId) {
    const event = await dbContext.TowerEvents.findById(eventId)
      .populate("creator", 'picture name')

    if (event == null) {
      throw new BadRequest("No events here")
    }
    return event
  }
  async editEvent(eventEdit, eventId, userId) {
    const originalEvent = await this.getSingleEvent(eventId)

    if (originalEvent.creatorId != userId) {
      throw new BadRequest("You do not have permission to edit this event")
    }

    if (originalEvent.isCanceled == true) {
      throw new BadRequest("This event is cancelled")
    }

    originalEvent.name = eventEdit.name ? eventEdit.name : originalEvent.name
    originalEvent.description = eventEdit.description ? eventEdit.description : originalEvent.description
    originalEvent.coverImg = eventEdit.coverImg ? eventEdit.coverImg : originalEvent.coverImg
    originalEvent.location = eventEdit.location ? eventEdit.location : originalEvent.location
    originalEvent.capacity = eventEdit.capacity ? eventEdit.capacity : originalEvent.capacity
    originalEvent.startDate = eventEdit.startDate ? eventEdit.startDate : originalEvent.startDate
    // originalEvent.isCanceled = eventEdit.isCanceled ? eventEdit.isCanceled : originalEvent.isCanceled
    originalEvent.type = eventEdit.type ? eventEdit.type : originalEvent.type

    await originalEvent.save()
    return originalEvent
  }

  async cancelEvent(eventId, userId) {
    const event = await this.getSingleEvent(eventId)

    if (event.creatorId != userId) {
      throw new Forbidden('You do not have permission to cancel this event.')
    }

    if (event.isCanceled == true) {
      throw new Forbidden(`Event "${event.name}" has already been cancelled`)
    }

    event.isCanceled = true
    await event.save()
    return `Event: ${event.name} was cancelled successfully`
  }


}



export const towerEventsService = new TowerEventsService()