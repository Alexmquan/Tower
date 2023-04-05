import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getSingleEvent)
      .get('/:id/tickets', this.getEventTickets)
      .get('/:id/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)
  }

  async createEvent(req, res, next) {
    try {
      let eventData = req.body
      eventData.creatorId = req.userInfo.id
      let event = await towerEventsService.createEvent(eventData)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getAllEvents(req, res, next) {
    try {
      let events = await towerEventsService.getAllEvents()
      return res.send(events)
    } catch (error) {
      next.error(error)
    }
  }

  async getSingleEvent(req, res, next) {
    try {
      let eventId = req.params.id
      let event = await towerEventsService.getSingleEvent(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      const eventId = req.params.id
      const eventEdit = req.body

      const editedEvent = await towerEventsService.editEvent(eventEdit, eventId)
      return res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      let userId = req.userInfo.id
      let eventId = req.params.id
      let message = await towerEventsService.cancelEvent(eventId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getEventTickets(req, res, next) {
    try {
      const eventId = req.params.id
      const tickets = await ticketsService.getEventTickets(eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async getEventComments(req, res, next) {
    try {
      let eventId = req.params.id
      let comments = await commentsService.getAllComments(eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

}