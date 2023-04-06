<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: towerEvent.id } }">
    <div class="card m-2 my-3 rounded">
      <img :src="towerEvent.coverImg" :alt="towerEvent.name" height="300">
      <div v-if="!towerEvent.isCanceled" class="p-2 card-bg">
        <h5>{{ towerEvent.name }}</h5>
        <h5>{{ towerEvent.location }}</h5>
        <h5>{{ towerEvent.startDate }}</h5>
      </div>
      <div v-else class="text-center isCanceled text-light">
        <h4>Sorry this event has been canceled</h4>
      </div>
    </div>
  </router-link>
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

.isCanceled {
  background-color: rgb(153, 21, 21);
}
</style>