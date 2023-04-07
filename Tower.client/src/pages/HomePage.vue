<template>
  <!-- SECTION Home Page Image With text over -->
  <div class="container-fluid main-bg">
    <section class="row">
      <div class="col-12 top-img m-3 justify-content-evenly d-flex flex-column text-light">
        <h3 class="ms-5 top-text">Get ahead of the scalpers.</h3>
        <h3 class="ms-5 top-text">Reserve your seat now with</h3>
        <h3 class="ms-5 top-text">real events for real people.</h3>
      </div>
    </section>

    <!-- SECTION Sort Bar -->
    <section class="row justify-content-evenly filter-bg text-light align-items-center">
      <div class="col-md-2 col-12 d-flex justify-content-center" @click="changeEventType('')">
        <div class="selectable ">
          <h2>ALL</h2>
        </div>
      </div>
      <div class="col-md-2 col-12 d-flex" @click="changeEventType(t)" v-for="t in eventTypes">
        <div class="selectable">
          <h2>{{ t.toUpperCase() }}</h2>
        </div>
      </div>
    </section>

    <!-- SECTION Event Cards -->
    <section class="row">
      <div class="col-md-3 col-12" v-for="e in events" :key="e.id">
        <EventCard :towerEvent="e" />
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

    const filterType = ref('')

    const eventTypes = ["concert", "convention", "sport", "digital"]

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
      eventTypes,
      events: computed(() => {
        if (!filterType.value) {
          return AppState.towerEvents
        } else {
          return AppState.towerEvents.filter(e => e.type == filterType.value)
        }
      }),

      changeEventType(type) {
        filterType.value = type
      }
    }
  }
}
</script>

<style scoped lang="scss">
.filter-bg {
  background-color: rgb(22, 22, 61);
  height: 6vh;
}

.main-bg {
  background-color: rgb(54, 134, 117);
}

.top-img {
  background-image: url("https://images.unsplash.com/photo-1573339886518-264aa6f194b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80");
  background-position: center;
  background-size: cover;
  width: 98.5%;
  height: 25vh
}

.top-text {
  text-shadow: 2px 2px 6px black;
}
</style>
