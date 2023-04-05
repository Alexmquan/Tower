import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class TicketsService {
  async createTicket(ticketData) {
    const event = await towerEventsService.getSingleEvent(ticketData.eventId)

    if (event.isCanceled == true) {
      throw new BadRequest('Sorry, something went wrong.')
    }

    let ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate({
      path: "event",
      populate: {
        // FIXME may need to add another path later
        path: "creator"
      }
    })

    await ticket.populate("profile")
    return ticket
  }

  async deleteTicket(ticketId, userId) {
    let ticket = await dbContext.Tickets.findById(ticketId)

    if (ticket == null) {
      throw new BadRequest("That ticket does not exist.")
    }

    if (userId != ticket.accountId) {
      throw new Forbidden('This ticket does not belong to you.')
    }

    await ticket.remove()
    return `Ticket has been successfully removed`
  }

  async getMyTickets(accountId) {
    let events = await dbContext.Tickets.find({ accountId })
      .populate({
        path: "event",
        populate: {
          // FIXME may need to add another path later
          path: "creator"
        }
      })
    return events
  }

  async getEventTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId })
      .populate("profile", 'name picture')
    return tickets
  }

}

export const ticketsService = new TicketsService()