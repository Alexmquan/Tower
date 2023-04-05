<template>
  <!-- SECTION Home Page Image With text over -->
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <div></div>
      </div>
    </section>
    <!-- SECTION Sort Bar -->
    <section>

    </section>
    <!-- SECTION Sort Bar -->
    <section></section>
    <!-- SECTION Event Cards -->
    <section class="row">
      <div class="col-md-3 col-12" v-for="">

      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { AppState } from "../AppState.js";

export default {
  setup() {
    return {
      events: computed(() => AppState.towerEvent)
    }
  }
}
</script>

<style scoped lang="scss"></style>
