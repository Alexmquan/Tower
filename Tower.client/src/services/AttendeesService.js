import { api } from "./AxiosService.js"

class TicketsService {
  async getAttendees(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
  }
}

export const ticketsService = new TicketsService()