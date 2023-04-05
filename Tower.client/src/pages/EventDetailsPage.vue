<template>
  <div class="container-fluid">
    <!-- SECTION details card -->
    <!-- <section class="row details-bg" :style="{ backgroundImage: `url(${activeEvent?.coverImg})` }"> -->
    <section class="card">
      <img class="card-img  card-height" :src="activeEvent?.coverImg" alt="">
      <div class="row card-img-overlay">
        <div class="col-5">
          <img class="active-image rounded mt-3" :src="activeEvent?.coverImg" :alt="activeEvent?.name">
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
      </div>
    </section>

    <!-- SECTION Attendees section-->
    <section class="row">
      <p>See whos attending</p>
      <div class="col-12 attendee-section text-light" v-for="a in attendees" :key="a.id">
        <img class="attendee-picture" :src="a.picture" alt="">
      </div>
    </section>
    <!-- SECTION Comments -->
    <section class="row justify-content-center">

      <div class="col-9 comment-section rounded">
        <p class="text-light mt-2">What people are saying</p>
        <div class="m-4">
          <form @submit.prevent="">
            <div>
              <textarea name="" id="" cols="30" rows="10" class="form-control"
                placeholder="Tell the people..."></textarea>
            </div>
            <div class="mt-3 d-flex justify-content-end">
              <button type="submit" class="btn btn-success">Post Comment</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { attendeesService } from "../services/AttendeesService.js";

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
      activeEvent: computed(() => AppState.activeTowerEvent),
      attendees: computed(() => AppState.attendees)
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

.attendee-picture {
  height: 3vh;
  width: 3vh;
  border-radius: 50%;
}

.attendee-section {
  height: 10vh;
  background-color: rgb(22, 22, 61);
}

.card-height {
  height: 45vh !important;
  object-fit: cover !important;

  -webkit-filter: blur(6px);
  ;
}

.comment-section {
  background-color: rgb(22, 22, 61);
}
</style>