<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 ">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="">
        <img alt="logo" src="../assets/img/Logo.png" height="45" />
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
    <div v-if="account.id">
      <button type="button" class="btn btn-success selectable" data-bs-toggle="modal" data-bs-target="#eventModal">Create
        Event</button>
    </div>
  </nav>
  <CreateEventModal />
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import CreateEventModal from "./CreateEventModal.vue";
import Login from './Login.vue'
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: { Login, CreateEventModal }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
