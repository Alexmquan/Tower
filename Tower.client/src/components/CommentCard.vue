<template>
  <div class="col-2"><img class="comment-image" :src="comment.creator.picture" :alt="comment.creator.name"></div>
  <div class="col-10">
    <div>
      <h5>{{ comment.creator.name }}</h5>
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
  height: 5vh;
  width: 5vh;
  border-radius: 50%;
}
</style>