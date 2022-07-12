<template>
  <form action="?search" method="get">
    <div class="input-group">
      <input
        type="text"
        name="search"
        required
        autocomplete="false"
        class="form-control col-8"
        placeholder="Search Items..."
        v-model.trim="search"
        @change="$emit('search', search)"
      />

      <button
        class="input-group-text bg-primary text-light"
        id="basic-addon2"
        type="submit"
      >
        Search
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Search",
  emits: ["search"],
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style>
</style>