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
    AppState.myEvents.push(new MyEvent(res.data))
    AppState.towerEvents.push(new TowerEvent(res.data))
    logger.log('[created Event', AppState.myEvents)
  }



}

export const eventsService = new EventsService()