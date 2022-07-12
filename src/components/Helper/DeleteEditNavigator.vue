<template>
  <div v-if="deleteId > 0 || today_history_counter.length > 0" class="position-fixed shadow"
    style="z-index: 999; right: 2rem; top: 7rem">
    <div class="p-3 bg-primary rounded d-flex align-items-center">
      <div class="mx-3">
        <Loader v-if="deleteReady" />
      </div>
      <p class="text-white mb-0">
        <span class="d-block" v-if="deleteId > 0">Edit</span>
        <span class="d-block" v-if="today_history_counter.length > 0">Today History</span>
      </p>
      <div class="text-white mx-3">
        <span id="counter" v-if="deleteId > 0">{{ deleteId }}</span>
        <span id="counter" v-if="today_history_counter.length > 0">{{
            today_history_counter.length
        }}</span>
        /
        <span id="total_counter">{{ total }}</span>
        <br />
      </div>
      <div>
        <button v-if="deleteId > 0" @click="deleteRequest()" class="btn btn-transparent btn-sm mx-2">
          <i class="fas fa-trash-alt text-danger"></i>
        </button>
        <button v-if="today_history_counter.length > 0" @click="$emit('todayHistoryCreateRequest')"
          class="btn btn-transparent btn-sm mx-2">
          <i class="fas fa-check text-dark"></i>
        </button>
        <button v-if="deleteId > 0" class="btn btn-transparent btn-sm" @click="$emit('deleteCancle')">
          <i class="fas fa-times text-white"></i>
        </button>
        <button v-if="today_history_counter.length > 0" class="btn btn-transparent btn-sm"
          @click="$emit('todayHistoryCancle')">
          <i class="fas fa-times text-white"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Helper/Loader";

export default {
  name: "Navigator",
  components: { Loader },
  props: [
    "deleteId",
    "editNav",
    "total",
    "deleteReady",
    "today_history_counter",
  ],
  emits: ["deleteRequest", "deleteCancle", 'todayHistoryCreateRequest', 'todayHistoryCancle'],
  data() {
    return {};
  },
  methods: {
    deleteRequest() {
      this.$emit("deleteRequest");
    },
  },
};
</script>

<style>
</style>