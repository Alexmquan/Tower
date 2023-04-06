<template>
  <div class="container-fluid">
    <!-- SECTION My events -->
    <section class="row">
      <h2>My Events</h2>
      <div class="col-md-3 col-12" v-for="e in events" :key="e.id">
        <EventCard :towerEvent="e" />
      </div>
    </section>



    <!-- SECTION Upcoming events -->
    <section class="row">
      <div class="col-md-8 col-12">
        <div></div>
      </div>
    </section>

  </div>
  <CreateEventModal />
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"

export default {
  setup() {

    async function getMyEvents() {
      try {

      } catch (error) {
        logger.error(error.message)
        Pop.error(error.message)
      }
    }

    return {
      account: computed(() => AppState.account),
      ticket: computed(() => AppState.myEvents)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
