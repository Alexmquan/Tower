import { AppState } from "../AppState.js"
import { Attendee } from "../models/Attendee.js"
import { MyEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AttendeesService {
  async getAttendees(eventId) {
    // debugger
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.attendees = res.data.map(a => new Attendee(a))
    logger.log('[Attnees from Appstate', AppState.attendees)
  }
  async createTicket(eventId) {
    const res = await api.post('api/tickets', eventId)
    logger.log("[ticket creation]", res.data)
    AppState.attendees.push(new Attendee(res.data))
    AppState.myEvents.push(new MyEvent(res.data))
  }

}

export const attendeesService = new AttendeesService()