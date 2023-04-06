<template>
  <div class="col-1 d-flex justify-content-center align-items-center"><img class="comment-image"
      :src="comment.creator.picture" :alt="comment.creator.name"></div>
  <div class="col-11">
    <div class="card-style ps-2 m-2 my-3 rounded d-flex flex-column justify-content-center">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="pt-2">{{ comment.creator.name }}</h5>
        <button @click="deleteComment()" class="btn btn-outline-danger m-1"><i class="mdi mdi-trash-can"></i></button>
      </div>
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>


<script>
import { Comment } from "../models/Comment.js";

export default {
  props: {
    comment: {
      type: Comment,
      required: true
    }
  },
  setup() {

    return {}
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