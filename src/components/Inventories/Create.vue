<template>
  <form @submit.prevent="store">
    <div class="mb-3">
      <label for="item" class="form-label">ပစ္စည်းနာမည်</label>
      <input type="text" v-model="item_name" required class="form-control text-primary" placeholder="ပန်းသီး"
        name="item_name" aria-describedby="emailHelp" />
    </div>
    <div class="mb-3">
      <label for="actual_price" class="form-label">အရင်း</label>
      <input type="number" required class="form-control text-primary" id="actual_price" placeholder="300"
        name="actual_price" v-model="actual_price" />
    </div>
    <div class="mb-3">
      <label for="price" class="form-label">ရောင်းဈေး</label>
      <input type="number" required class="form-control text-primary" id="price" placeholder="300" name="price"
        v-model="price" />
    </div>
    <div class="mb-3">
      <label for="qty" class="form-label">အရေအတွက်</label>
      <input type="number" required class="form-control text-primary col-3" id="qty" placeholder="1" name="qty"
        v-model="qty" />
    </div>
    <div class="mb-3 d-flex align-items-center">
      <input type="checkbox" class="form-check mr-3" value="true" name="order_available" v-model="order_available" />
      <small>Check if this item can order.</small>
    </div>
    <button type="submit" class="btn btn-primary">
      <Loader v-if="ready" />
      Create
    </button>
  </form>
</template>

<script>
import axios from "axios";
import Loader from '@/components/Helper/Loader'
export default {
  name: "Create",
  components: { Loader },
  emits: ["data"],
  data() {
    return {
      item_name: "",
      price: "",
      order_available: false,
      ready: false,
      qty: '',
      actual_price: '',
    };
  },
  methods: {
    store() {
      if (this.price > this.actual_price) {
        this.ready = true
        axios
          .post("http://localhost:8000/api/inventory/create", {
            item_name: this.item_name,
            price: this.price,
            order_available: this.order_available,
            qty: this.qty,
            actual_price: this.actual_price,
          })
          .then((response) => {
            this.$emit("data", response.data);
            this.item_name = "";
            this.price = "";
            this.qty = "";
            this.actual_price = "";
            this.ready = false
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        alert('please check your price again for create')
      }

    },
  },
};
</script>

<style>
</style>