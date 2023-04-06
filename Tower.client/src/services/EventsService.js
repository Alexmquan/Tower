import { AppState } from "../AppState.js"
import { MyEvent, TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService {
  async getAllEvents() {
    const res = await api.get('api/events')
    AppState.towerEvents = res.data.map(e => new TowerEvent(e))
    logger.log('[get all TowerEvents]', AppState.towerEvents)
  }

  async getEventById(eventId) {
    const res = await api.get(`/api/events/${eventId}`)
    AppState.activeTowerEvent = new TowerEvent(res.data)
    logger.log("[active towerEvent", AppState.activeTowerEvent)
  }

  async createEvent(eventData) {
    // FIXME may need to fix later (9:47pm 4.5.2023)
    const res = await api.post('/api/events', eventData)
    const newEvent = new TowerEvent(res.data)
    AppState.myEvents.push(newEvent)
    AppState.towerEvents.push(newEvent)
    logger.log('[created Event', AppState.myEvents)
    return newEvent
  }

  async getMyEvents() {
    const res = await api.get('api/events')
    // debugger
    const allEvents = res.data.map(e => new MyEvent(e))
    const myEvents = allEvents.filter(e => e.creatorId == AppState.user.id)

    AppState.myEvents = myEvents
  }

  async cancelEvent(eventId) {
    const res = await api.delete('api/events/' + eventId)
    logger.log('[Removing ticket]', res.data)
    AppState.activeTowerEvent.isCanceled = true

  }
}

export const eventsService = new EventsService()