<template>
  <!-- SECTION Home Page Image With text over -->
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <div></div>
      </div>
    </section>
    <!-- SECTION Sort Bar -->
    <section>

    </section>
    <!-- SECTION Sort Bar -->
    <section></section>
    <!-- SECTION Event Cards -->
    <section class="row">
      <div class="col-md-3 col-12" v-for="e in events" :key="e.id">
        <EventCard :event="e" />
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {

    async function getAllEvents() {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        Pop.error(error.message)
        logger.error(error.message)
      }
    }

    onMounted(() => {
      getAllEvents()
    })
    return {
      events: computed(() => AppState.towerEvent)
    }
  }
}
</script>

<style scoped lang="scss"></style>
