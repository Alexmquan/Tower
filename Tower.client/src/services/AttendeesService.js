import { AppState } from "../AppState.js"
import { Attendee } from "../models/Attendee.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AttendeesService {
  async getAttendees(eventId) {
    // debugger
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.attendees = res.data.map(a => new Attendee(a))
    logger.log('[Attnees from Appstate', AppState.attendees)
  }
}

export const attendeesService = new AttendeesService()