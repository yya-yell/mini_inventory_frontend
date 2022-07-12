<template>
  <div class="dropdown">
    <button
      class="btn btn-outline-primary dropdown-toggle"
      href="#"
      role="button"
      id="dropdownMenuLink"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span id="filter" style="text-transform: capitalize">{{
        dropdownNav
      }}</span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <li>
        <button @click="dropdownHaldler('newest')" class="dropdown-item">
          Newest
        </button>
      </li>
      <li>
        <button @click="dropdownHaldler('oldest')" class="dropdown-item">
          Oldest
        </button>
      </li>
      <li>
        <button @click="dropdownHaldler('price')" class="dropdown-item">
          Price
        </button>
      </li>
      <li>
        <a
          class="dropdown-item"
          id="viaOrder"
          href="?order_available=order_available"
          >Order Available</a
        >
      </li>
      <li>
        <a
          class="dropdown-item"
          id="viaNormal"
          href="?normal_items=normal_items"
          >Normal Items</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  emits: ["oldest", "newest", "price"],
  data() {
    return {
      dropdownNav: "Sort by",
    };
  },
  methods: {
    dropdownHaldler(name) {
      this.$emit(name);
      this.dropdownNav = name;
    },
  },
};
</script>

<style>
</style>