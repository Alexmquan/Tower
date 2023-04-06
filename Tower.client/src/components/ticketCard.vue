<template>
  <div class="row">
    <div class="col-4">
      <img class="ticket-image" :src="towerEvent.coverImg" alt="">
    </div>
    <div class="col-8">
      <h3>{{ towerEvent.name }}</h3>
      <h6>{{ towerEvent.location }}</h6>
      <h6>{{ towerEvent.startDate }}</h6>
    </div>
  </div>
</template>


<script>
import { TowerEvent } from "../models/TowerEvent.js";

export default {
  props: {
    towerEvent: {
      type: TowerEvent,
      required: true
    }
  },

  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.ticket-image {
  object-fit: cover;
  object-position: center;
  height: 15vh;
  width: auto;
}
</style>