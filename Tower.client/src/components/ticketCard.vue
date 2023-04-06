<template>
  <div class="row card-style text-light ">
    <div class="col-4">
      <img class="ticket-image " :src="myAttendees.event.coverImg" :alt="myAttendees.event.name">
    </div>
    <div class="col-8 d-flex justify-content-between">
      <div class="d-flex flex-column">
        <h3 class="my-3">{{ myAttendees.event.name }}</h3>
        <h6>{{ myAttendees.event.location }}</h6>
        <h6>{{ myAttendees.event.startDate }}</h6>
      </div>
      <div class="m-3 flex-column d-flex justify-content-between">
        <button @click="deleteTicket(myAttendees.id)" class="btn btn-danger">Not Going</button>
        <img class="qrCode mb-3" src="src\assets\img\QR_code.png" alt="">
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Attendee } from "../models/Attendee.js";
import { Ticket } from "../models/Ticket.js";
import { attendeesService } from "../services/AttendeesService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";


export default {
  props: {
    myAttendees: {
      type: Ticket,
      required: true
    }
  },

  setup() {
    return {


      async deleteTicket(attendeeId) {
        try {
          if (await Pop.confirm('Are you sure you want to stop going to the event?')) {
            await attendeesService.deleteTicket(attendeeId)
          }
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.ticket-image {
  object-fit: cover;
  object-position: center;
  height: 25vh;
  width: 35vh;
}

.card-style {
  background-color: rgb(22, 22, 61);
}

.qrCode {
  height: 10vh;
  width: 10vh;
}
</style>