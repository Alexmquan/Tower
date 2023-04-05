import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
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





}

export const eventsService = new EventsService()