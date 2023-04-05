<template>
  <div class="container-fluid">
    <!-- SECTION details card -->
    <section class="row details-bg" :style="{ backgroundImage: `url(${activeEvent?.coverImg})` }">
      <div class="col-5">
        <img class="active-image mt-3" :src="activeEvent?.coverImg" :alt="activeEvent?.name">
      </div>
      <div class="col-7 text-light">
        <div class="row info-style">
          <div class="col-6 d-flex justify-content-start flex-column mt-3">
            <h3>{{ activeEvent?.name }}</h3>
            <h5>{{ activeEvent?.location }}</h5>
          </div>
          <div class="col-6 mt-3 justify-content-end d-flex">
            <h4>{{ activeEvent?.startDate }}</h4>
          </div>
          <div class="col-12">
            <p>{{ activeEvent?.description }}</p>
          </div>
          <div class="col-9 d-flex align-items-end">
            <h3>{{ activeEvent?.capacity }} </h3>
            <h4 class="ms-2">spots left</h4>
          </div>
          <div class="col-3 align-items-end d-flex">
            <button class="btn btn-warning">Attend</button>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION Attendees section-->
    <section class="row">
      <p>See whos attending</p>
    </section>
    <!-- SECTION Comments -->
    <section></section>
  </div>
</template>


<script>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute()

    async function getEventById() {
      try {
        const eventId = route.params.eventId
        await eventsService.getEventById(eventId)
      } catch (error) {
        logger.error(error.message)
        Pop.error(error.message)
      }
    }

    async function getAttendees() {
      try {
        const eventId = route.params.eventId
        await attendeesService.getAttendees(eventId)
      } catch (error) {
        logger.error(error.message)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getEventById()
      getAttendees()
    })
    return {
      activeEvent: computed(() => AppState.activeTowerEvent)
    }
  }
}
</script>


<style lang="scss" scoped>
.active-image {
  object-fit: cover;
  object-position: center;
  height: 40vh;
  width: 100%;
}

.info-style {
  height: 40vh;
  text-shadow: 2px 2px 6px black;
}

.details-bg {
  background-position: center;
  background-size: cover;
  // backdrop-filter: blur(20px);
  // opacity: .9;
  // -webkit-filter: blur(8px);
}
</style>