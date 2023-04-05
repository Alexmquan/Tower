<template>
  <div class="card m-2 my-3 rounded">
    <img :src="towerEvent.coverImg" :alt="towerEvent.name" height="300">
    <div class="p-2 card-bg">
      <h5>{{ towerEvent.name }}</h5>
      <h5>{{ towerEvent.location }}</h5>
      <h5>{{ towerEvent.startDate }}</h5>
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
.card-bg {
  background-color: rgb(22, 22, 61);
  color: white;
}
</style>