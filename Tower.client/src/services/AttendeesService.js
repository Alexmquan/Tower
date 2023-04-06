import { AppState } from "../AppState.js"
import { Attendee } from "../models/Attendee.js"
import { MyEvent, TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AttendeesService {
  async getAttendees(eventId) {
    // debugger
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.attendees = res.data.map(a => new Attendee(a))
    logger.log('[Atendees from Appstate', res.data)
  }
  async createTicket(eventId) {
    const res = await api.post('api/tickets', eventId)
    logger.log("[ticket creation]", res.data)
    AppState.attendees.push(new Attendee(res.data))
    AppState.myEvents.push(new MyEvent(res.data))
  }

  async deleteTicket(attendeeId) {
    const res = await api.delete(`api/tickets/${attendeeId}`)
    logger.log('[Removing ticket]', res.data)
    // FIXME not responsive but works on hard refresh
    const ticketIndex = AppState.attendees.findIndex(a => a.id == attendeeId)
    if (ticketIndex !== -1) {
      AppState.attendees.splice(ticketIndex, 1)
    }

    const eventIndex = AppState.myEvents.findIndex(e => e.id == attendeeId)
    if (eventIndex !== -1) {
      AppState.myEvents.splice(eventIndex, 1)
    }
  }
}



export const attendeesService = new AttendeesService()