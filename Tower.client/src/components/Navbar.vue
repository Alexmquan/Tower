<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3 d-flex justify-content-between align-items-center">
    <div class="mt-4">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">
        <div class="">
          <img alt="logo" src="../assets/img/Logo.png" height="45" />
        </div>
      </router-link>
    </div>

    <div class="d-flex">
      <div class="collapse navbar-collapse mx-2" id="navbarText">
        <button class="btn btn-success">
          <Login />
        </button>
      </div>
      <div v-if="account.id" class="">
        <router-link :to="{ name: 'Account' }">
          <button class="btn btn-success">
            Manage Account
          </button>
        </router-link>
        <!-- <div class="collapse navbar-collapse" id="navbarText">
        <button class="btn btn-success">
          <Login />
        </button>
      </div> -->
        <button type="button" class="btn btn-success selectable  mx-2" data-bs-toggle="modal"
          data-bs-target="#eventModal">Create
          Event</button>
      </div>
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
