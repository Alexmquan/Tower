<template>
  <div class="col-1 d-flex justify-content-center align-items-center"><img class="comment-image"
      :src="comment.creator.picture" :alt="comment.creator.name"></div>
  <div class="col-11">
    <div class="card-style ps-2 m-2 my-3 rounded d-flex flex-column justify-content-center">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="pt-2">{{ comment.creator.name }}</h5>
        <button @click="deleteComment()" class="btn btn-outline-danger m-1" title="Delete Comment"><i
            class="mdi mdi-trash-can"></i></button>
      </div>
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>


<script>
import { Comment } from "../models/Comment.js";
import { commentsService } from "../services/CommentsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    comment: {
      type: Comment,
      required: true
    }
  },
  setup(props) {

    return {
      async deleteComment() {
        try {
          if (await Pop.confirm('Are you sure you want to delete this comment?')) {
            const commentId = props.comment.id
            await commentsService.deleteComment(commentId)
          }
        } catch (error) {
          logger.error(error.message)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.comment-image {
  height: 6vh;
  width: 6vh;
  border-radius: 50%;
}

.card-style {
  background-color: white;
}
</style>