import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {

  async createComment(commentData) {
    const res = await api.post('/api/comments', commentData)
    const newComment = new Comment(res.data)
    AppState.comments.unshift(newComment)
    logger.log('[New Comment]', newComment)
    return newComment
  }
  async getCommentsByEvent(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.comments = res.data.map(c => new Comment(c))
    logger.log('[Appstate comments]', AppState.comments)
  }

  async deleteComment(commentId) {
    await api.delete('api/comments/' + commentId)
    const index = AppState.comments.findIndex(c => c.id == commentId)
    AppState.comments.splice(index, 1)
    logger.log('[delete commenent]', commentId)
  }
}

export const commentsService = new CommentsService()