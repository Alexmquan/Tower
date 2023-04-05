import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class CommentsService {
  async createComment(commentData) {
    const event = await towerEventsService.getSingleEvent(commentData.eventId)
    if (event.isCanceled == true) {
      throw new BadRequest('This event is cancelled')
    }
  }

}

export const commentsService = new CommentsService()