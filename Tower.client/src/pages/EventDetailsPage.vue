<template>
  <div class="container-fluid">
    <!-- SECTION details card -->
    <section>

    </section>

    <!-- SECTION Attendees section-->
    <section></section>
    <!-- SECTION Comments -->
    <section></section>
  </div>
</template>


<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { eventsService } from "../services/EventsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute()

    async function getEventById() {
      try {
        const eventId = route.params.eventId
        await eventsService.getEvenById(eventId)
      } catch (error) {
        logger.error(error.message)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getEventById()
    })
    return {}
  }
}
</script>


<style lang="scss" scoped></style>