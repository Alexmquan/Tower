<template>
  <div class="container-fluid background-style">
    <!-- SECTION My events -->
    <section class="row">
      <h2>My Events</h2>
      <div class="col-md-3 col-12" v-for="m in myEvents" :key="m.id">
        <EventCard :towerEvent="m" />
      </div>
    </section>



    <!-- SECTION Upcoming events -->
    <section class="row d-flex justify-content-center">
      <h2>Upcoming Events</h2>
      <div class="col-md-7 col-12 my-2" v-for="t in myTickets" :key="t.id">
        <TicketCard :myAttendees="t" />
        <!-- {{ t.event.name }} -->
      </div>
    </section>

  </div>
  <CreateEventModal />
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService.js"
import { attendeesService } from "../services/AttendeesService.js"
import { eventsService } from "../services/EventsService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"

export default {
  setup() {

    async function getMyEvents() {
      try {
        await eventsService.getMyEvents()
      } catch (error) {
        logger.error(error.message)
        Pop.error(error.message)
      }
    }

    async function getMyTickets() {
      try {
        await accountService.getMyTickets()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getMyEvents()
      getMyTickets()
    })

    return {
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.myEvents),
      myTickets: computed(() => AppState.myAttendees)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.background-style {
  background-color: rgb(54, 134, 117)
}
</style>
