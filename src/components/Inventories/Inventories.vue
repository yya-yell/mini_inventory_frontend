<template>
  <div v-for="inventory in inventories" :key="inventory.id" class="col-md-3 col-lg-2 my-3" id="item_wrapper">
    <div class="card text-center p-2 border" :class="inventory.order_available ? 'border-success' : 'border-primary'">
      <div v-if="edit_form == inventory.id">
        <form @submit.prevent="submit">
          <input type="hidden" name="id" :value="inventory.id" />
          <input type="text" name="item_name" :class="inputTest + ' item_name'" :value="inventory.item_name" />
          <input type="number" name="actual_price" :value="inventory.actual_price" :class="inputTest + ' my-2'" />
          <input type="number" name="price" :value="inventory.price" :class="inputTest + ' my-2'" />
          <input type="number" name="qty" :value="inventory.qty" min="1" :class="inputTest + ' my-2'" />
          <div class="d-flex align-items-center">
            <input type="checkbox" value="true" :checked="inventory.order_available" class="form-check-sm"
              name="order_available" />
            <small class="text-xs mx-2">Check if this can order.</small>
          </div>

          <button type="submit" class="btn btn-sm btn-transparent">
            <i class="fas fa-check text-success "></i>
          </button>
          <button type="button" class="btn btn-sm btn-transparent" @click="edit_form = false">
            <i class="fas fa-times text-danger"></i>
          </button>
        </form>
      </div>
      <div v-if="edit_form != inventory.id">
        <p>{{ inventory.item_name }}</p>
        <p>
          <span>အရင်း - {{ inventory.actual_price }}</span> ~ kyat
          <span>ရောင်းဈေး - {{ inventory.price }}</span> ~ kyat
          <span class="mx-1 text-secondary">({{ inventory.qty }} ခု ကျန်)</span>
        </p>
        <div id="edit_btns" :class="classTest" v-if="edit">
          <button class="btn btn-transparent btn-sm" @click="editFormHandler(inventory.id)">
            <i class="fas fa-edit text-info"></i>
          </button>
          <label class="control control-checkbox">
            <input type="checkbox" id="deleter" @click="deleteEmitter(inventory.id)" />
            <div class="control_indicator"></div>
          </label>
        </div>
      </div>
      <div v-if="today_history && inventory.qty > 0" style="">
        <input type="checkbox" :value="inventory.id" v-model="todayHistory" @click="todayHistoryHandler(inventory.id)"
          class="mx-2" />
        <input type="number" @keydown="$event.preventDefault()" :id="'qtyOf' + inventory.id" placeholder="1" disabled
          min="1" :max="inventory.qty" value="1" @input="optionalHandler(inventory.id)" class="qty_input border" />
        <textarea style="resize: none" disabled :id="'noteOf' + inventory.id" name="" cols="1" rows="2"
          class="form-control mt-2" placeholder="Note (optional)" @change="optionalHandler(inventory.id)"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Inventories_list",
  props: [
    "edit",
    "inventories",
    "deleteCancleEvent",
    "today_history",
    "deleteId",
    "todayHistoryCreateRequest",
    'todayHistoryCancleEvent'
  ],
  emits: [
    "toDelete",
    "returnCancle",
    "edit_success",
    "todayHistoryCount",
    "todayHistoryCreateSuccess",
    "todayHistoryClose",
    'todayHistoryCancleSuccess'
  ],
  data() {
    return {
      edit_form: false,
      todayHistory: [],
      todayHistoryPrepare: [],
      classTest: 'd-flex justify-content-between align-items-center',
      inputTest: 'form-control price text-center form-control-sm'
    };
  },
  created() {
    this.deleteId.forEach((e) => {
      let inp = document
        .querySelectorAll("deleter")
        .findIndex((i) => e == i.value);
      console.log(inp);
    });
  },
  methods: {
    deleteEmitter(n) {
      this.$emit("toDelete", n);
    },
    editFormHandler(id) {
      this.edit_form = id;
    },
    submit(event) {
      let { id, item_name, qty, actual_price, price, order_available } = Object.fromEntries(
        new FormData(event.target)
      );
      if (parseInt(actual_price) < parseInt(price)) {
        axios
          .put(`inventory/${id}/edit`, {
            item_name: item_name,
            price: price,
            qty: qty,
            actual_price: actual_price,
            order_available: order_available == undefined ? false : true,
          })
          .then((response) => {
            this.$emit("edit_success", response.data.data);
            this.edit_form = false;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert('invalid prices')
        this.edit_form = false;

      }

    },
    todayHistoryHandler(id) {
      let obj = { id: id, qty: 1, note: "" };
      this.todayHistoryPrepare.push(obj);
      let holder = this.todayHistoryPrepare.filter((e) => e.id == id);
      if (holder) {
        this.todayHistoryPrepare = this.todayHistoryPrepare.filter(
          (e) => e.id != holder
        );
      }
      this.$emit("todayHistoryCount", id);
    },
    optionalHandler(id) {
      let index = this.todayHistoryPrepare.findIndex((e) => e.id == id);
      let qty = document.getElementById("qtyOf" + id);
      let note = document.getElementById("noteOf" + id);
      this.todayHistoryPrepare[index].qty = qty.value;
      this.todayHistoryPrepare[index].note = note.value;
    },
  },
  watch: {
    deleteCancleEvent() {
      document.querySelectorAll("#deleter").forEach((e) => (e.checked = false));
      this.$emit("returnCancle");
    },
    todayHistory(newValue, oldValue) {
      if (newValue.length > oldValue.length) {
        if (newValue.length) {
          newValue.forEach((e) => {
            let qty = document.getElementById("qtyOf" + e);
            let note = document.getElementById("noteOf" + e);
            if (qty && note) {
              qty.removeAttribute("disabled");
              note.removeAttribute("disabled");
            }
          });
        }
      }
      if (newValue.length < oldValue.length) {
        let id = oldValue.filter((item) => {
          return !newValue.includes(item);
        });
        id.forEach((e) => {
          let qty = document.getElementById("qtyOf" + e);
          let note = document.getElementById("noteOf" + e);
          if (qty && note) {
            qty.setAttribute("disabled", "disabled");
            qty.value = "";
            note.setAttribute("disabled", "disabled");
            note.value = "";
          }
        });
        this.todayHistoryPrepare = this.todayHistoryPrepare.filter((e) => {
          return e.id != id;
        });
      }
    },
    todayHistoryCreateRequest() {
      if (this.todayHistoryCreateRequest) {
        axios
          .post("todayHistory/store", {
            items: this.todayHistoryPrepare,
          })
          .then((response) => {
            // response.data.id.forEach((e) => {
            //   console.log(e)
            // let qty = document.getElementById("qtyOf" + e);
            // let note = document.getElementById("noteOf" + e);
            // console.log(qty)
            // if (qty && note) {
            //   qty.setAttribute("disabled", "disabled");
            //   note.setAttribute("disabled", "disabled");
            // }
            // });
            this.todayHistory = [];
            this.todayHistoryPrepare = [];
            this.$emit("todayHistoryClose", response.data.id)
            this.$root.todayHistory_notifier = true
          })
          .catch((error => {
            console.log(error)
          }))
      }
    },
    today_history(v) {
      if (!v) {
        this.todayHistory = [];
        this.todayHistoryPrepare = [];
        this.$emit("todayHistoryClose");
      }
    },
    todayHistoryCancleEvent(v) {
      if (v) {
        this.todayHistory = [];
        this.todayHistoryPrepare = [];
        this.$emit('todayHistoryCancleSuccess')
      }
    }
  },
};
</script>

<style>
.control {
  font-family: arial;
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 5px;
  padding-top: 20px;
  cursor: pointer;
  font-size: 13px;
}

.control input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.control_indicator {
  position: absolute;
  top: 2px;
  left: 0;
  height: 20px;
  width: 20px;
  background: #f3c0c0;
  border: 0px solid #000000;
  border-radius: 52px;
}

.control input:checked~.control_indicator {
  background: #c02a49;
}

.control:hover input:not([disabled]):checked~.control_indicator,
.control input:checked:focus~.control_indicator {
  background: #c02a49;
}

.control_indicator:after {
  box-sizing: unset;
  content: "";
  position: absolute;
  display: none;
}

.control input:checked~.control_indicator:after {
  display: block;
}

.control-checkbox .control_indicator:after {
  left: 8px;
  top: 4px;
  width: 3px;
  height: 8px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.control-checkbox .control_indicator::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 4.5rem;
  height: 4.5rem;
  margin-left: -1.3rem;
  margin-top: -1.3rem;
  background: #2aa1c0;
  border-radius: 3rem;
  opacity: 0.6;
  z-index: 99999;
  transform: scale(0);
}

@keyframes s-ripple {
  0% {
    transform: scale(0);
  }

  20% {
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}

@keyframes s-ripple-dup {
  0% {
    transform: scale(0);
  }

  30% {
    transform: scale(1);
  }

  60% {
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}

.control-checkbox input+.control_indicator::before {
  animation: s-ripple 250ms ease-out;
}

.control-checkbox input:checked+.control_indicator::before {
  animation-name: s-ripple-dup;
}
</style>