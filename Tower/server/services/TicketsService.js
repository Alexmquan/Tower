import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
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
      throw new BadRequest("That Collaborator doesn't exist.")
    }

    if (userId != ticket.accountId) {
      throw new Forbidden(`You can't delete somebody else. FOO!`)
    }

    await ticket.remove()
    return `You are no longer collaborated on this project.`
  }


}

export const ticketsService = new TicketsService()