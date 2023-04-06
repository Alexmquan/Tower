<template>
  <div class="container-fluid background-style">
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
            <div class="col-12">
              <div v-if="account.id == activeEvent?.creatorId">
                <button class="btn btn-warning ms-3" data-bs-toggle="modal" data-bs-target="#eventModal">Edit
                  Event</button>

              </div>
            </div>
            <div class="col-12" v-if="!activeEvent?.isCanceled">
              <div class="row">
                <div class="col-9 d-flex align-items-end">
                  <h3>{{ activeEvent?.capacity }} </h3>
                  <h4 class="ms-2">spots left</h4>
                </div>
                <div class="col-3 align-items-end d-flex">



                  <div>
                    <button v-if="account.id == activeEvent?.creatorId" @click="cancelEvent(activeEvent?.id)"
                      class="btn btn-danger ms-3">Cancel Event
                    </button>
                    <!-- FIXME add check so you cannot attend more than once -->
                    <button v-if="(activeEvent?.capacity > 0) || (attendees.eventId == activeEvent?.id)"
                      @click="createTicket()" class="btn btn-warning">Attend</button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="col-12 isCanceled text-center">
              <h1>Sorry this Event has been canceled</h1>
            </div>
            <div v-if="(!activeEvent?.capacity > 0)" class="isCanceled text center">
              <h1>Sorry this show is sold out</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION Attendees section-->
    <section class="row">
      <p>See whos attending</p>
      <div class="col-12 attendee-section text-light ">
        <img v-for="a in attendees" :key="a.id" class="attendee-picture mx- mt-2" :src="a.profile.picture"
          :alt="a.profile.name">
      </div>
    </section>
    <!-- SECTION Comments -->
    <section class="row justify-content-center">

      <div class="col-9 comment-section rounded my-5 pb-4">
        <p class="text-light mt-2">What people are saying</p>
        <div v-if="!activeEvent?.isCanceled" class="m-4">
          <form @submit.prevent="createComment()">
            <div>
              <textarea name="body" id="body" required cols="30" rows="6" v-model="commentBody.body" class="form-control"
                placeholder="Tell the people..."></textarea>
            </div>
            <div class="mt-3 d-flex justify-content-end">
              <button type="submit" class="btn btn-success">Post Comment</button>
            </div>
          </form>
        </div>
        <div class="row" v-for="c in comments" :key="c.id">
          <!-- comment card here -->
          <CommentCard :comment="c" />
        </div>
      </div>
    </section>
  </div>
  <CreateEventModal />
</template>


<script>
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { attendeesService } from "../services/AttendeesService.js";
import { commentsService } from "../services/CommentsService.js";

export default {
  setup() {
    const route = useRoute()

    const commentBody = ref({})

    async function getEventById() {
      try {
        const eventId = route.params.eventId
        await eventsService.getEventById(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getAttendees() {
      try {
        const eventId = route.params.eventId
        await attendeesService.getAttendees(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    async function getCommentsByEvent() {
      try {
        const eventId = route.params.eventId
        await commentsService.getCommentsByEvent(eventId)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getEventById()
      getAttendees()
      getCommentsByEvent()
    })
    return {
      commentBody,
      activeEvent: computed(() => AppState.activeTowerEvent),
      attendees: computed(() => AppState.attendees),
      comments: computed(() => AppState.comments.reverse()),
      account: computed(() => AppState.account),

      async createComment() {
        try {
          const commentData = commentBody.value
          commentData.eventId = route.params.eventId
          await commentsService.createComment(commentData)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async createTicket() {
        try {
          await attendeesService.createTicket({ eventId: route.params.eventId })
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async cancelEvent(eventId) {
        try {
          if (await Pop.confirm('Are you sure you want to cancel the event?')) {
            await eventsService.cancelEvent(eventId)
          }
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }



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

.background-style {
  background-color: rgb(54, 134, 117)
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

  -webkit-filter: blur(8px);
  ;
}

.comment-section {
  background-color: rgb(22, 22, 61);
}

.isCanceled {
  background-color: rgb(153, 21, 21);
}
</style>