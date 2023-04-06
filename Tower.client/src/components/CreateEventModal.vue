<template>
  <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Create Event</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <form @submit.prevent="createEvent()">

          <div class="modal-body row">
            <div class="col-md-6 col-12">
              <label for="name">Name</label>
              <input type="text" required v-model="creatable.name" name="name" class="form-control" id="name"
                maxlength="100">
            </div>
            <div class="col-md-6 col-12">
              <label for="location">Location</label>
              <input type="text" v-model="creatable.location" name="location" class="form-control" id="location"
                maxlength="100">
            </div>
            <div class="col-12">
              <label for="coverImg">Cover Image(URL)</label>
              <input type="url" required v-model="creatable.coverImg" name="coverImg" class="form-control" id="coverImg"
                maxlength="500">
            </div>
            <div class="col-12">
              <select class="form-select my-3" aria-label="Default select example" v-model="creatable.type" required
                name="type" id="type">
                <option disabled selected>Event type</option>
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>
              </select>

            </div>

            <div class="col-md-4 col-12">
              <label for="startDate">Start Date</label>
              <input type="date" required v-model="creatable.startDate" name="startDate" class="form-control"
                id="startDate" min="2023-04-05" max="2030-01-01">
            </div>

            <div class="col-md-4 col-12">
              <label for="capacity">Event capacity</label>
              <input type="number" required v-model="creatable.capacity" name="capacity" class="form-control"
                id="capacity" max="1000000" min="1">
            </div>
            <div class="col-md-4 col-12 d-flex">
              <label for="isCanceled">Is this event cancelled?</label>
              <input type="checkbox" v-model="creatable.isCanceled" name="isCanceled" id="isCanceled">
            </div>
            <div class="mt-3 col-12">
              <textarea v-model="creatable.description" name="description" class="form-control" id="description"
                maxlength="100" cols="30" rows="10" placeholder="Description here..."></textarea>
            </div>


          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Create Event</button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>


<script>
import { ref, computed } from "vue";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {

    const creatable = ref({})

    return {
      creatable,
      account: computed(() => AppState.account),
      event: computed(() => AppState.towerEvents),

      async createEvent() {
        try {
          logger.log('[modal create event]', creatable.value)
          const eventData = creatable.value
          await eventsService.createEvent(eventData)
        } catch (error) {
          logger.error(error.message)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>