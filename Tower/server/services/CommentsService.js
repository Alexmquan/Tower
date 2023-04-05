import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class CommentsService {
  async createComment(commentData) {
    const event = await towerEventsService.getSingleEvent(commentData.eventId)
    if (event.isCanceled == true) {
      throw new BadRequest('This event is cancelled')
    }
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate("creator", 'picture name')
    return comment
  }

  async getAllComments(eventId) {
    const events = await dbContext.Comments.find({ eventId })
      .populate('creator', "picture name")
    return events
  }

  async deleteComment(userId, commentId) {
    let comment = await dbContext.Comments.findById(commentId)
    if (comment == null) {
      throw new BadRequest("This comment does not exist.")
    }

    if (comment.creatorId != userId) {
      throw new BadRequest("You are not authorized to delete this comment")
    }

    await comment.remove()
    return ("Your comment has been successfully deleted")
  }
}

export const commentsService = new CommentsService()