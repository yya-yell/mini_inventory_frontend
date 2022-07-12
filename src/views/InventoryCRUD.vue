<template>
  <div>
    <DeleteEditNavigator :deleteId="deleteId.length" :editNav="editNav" :total="inventories.length"
      @deleteRequest="deleteConfirm()" :deleteReady="deleteReady" @deleteCancle="deleteCancle"
      :today_history_counter="today_history_counter" @todayHistoryCreateRequest="todayHistoryCreateRequest = true"
      @todayHistoryCreateSuccess="todayHistoryCreateRequest = false" @todayHistoryCancle="todayHistoryCancle" />

    <div class="w-100">
      <div class="row">
        <div class="col-lg-3">
          Create
          <Create @data="pusher($event)" />
          <div class="mt-5 bg-primary rounded p-3">
            <p>Recently</p>
            <ul>
              <li> ပစ္စည်း ၄ မျိူး ကျသင့်ငွေ 1000 ကျပ်</li>
            </ul>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="row">
            <div class="col-md-12 col-lg-auto">
              <div class="d-flex mt-3">
                <DropDown @price="price_handler()" @newest="newest_handler(1)" @oldest="newest_handler(0)" />

                <ActionButtons @edit="editor()" @today_history="todayHistoryHandler" />
              </div>
            </div>
            <div class="col-md-12 col-lg-auto">
              <div class="d-flex mt-3">
                <div class="input-group mx-3">
                  <input type="text" class="form-control" placeholder="Search..." v-model.trim="search" />
                  <button v-if="search" class="btn bg-transparent" style="
                      margin-left: -40px;
                      z-index: 100;
                      margin-bottom: 40px;
                    " @click="search = ''">
                    <i class="fa fa-times text-danger"></i>
                  </button>
                </div>
                <button class="btn btn-primary">
                  {{ inventories.length }} total
                </button>
              </div>
            </div>
          </div>
          <div class="row scroll" id="inventoreis_wrapper">
            <!-- <div v-if="all_ready" class="d-flex justify-content-center align-items-center mt-3">
              <Loader />
              <img src="../assets/undraw_loading_re_5axr.svg" class="mt-3 w-25" />
            </div> -->
            <Inventories_list v-if="search_item.length" :edit="edit" :inventories="search_item" @toDelete="deleteHandler($event)"
              :deleteCancleEvent="deleteCancleEvent" @returnCancle="deleteCancleEvent = false"
              @edit_success="edit_success($event)" :today_history="today_history" :deleteId="deleteId"
              @todayHistoryCount="todayHistoryCount($event)" :todayHistoryCreateRequest="todayHistoryCreateRequest"
              @todayHistoryClose="todayHistoryClose($event)" :todayHistoryCancleEvent="todayHistoryCancleEvent"
              @todayHistoryCancleSuccess="todayHistoryCancleEvent = false" />
            <div v-else class="text-muted text-center mt-5">
              <img src="../assets/undraw_no_data_re_kwbl.svg" class="w-25" alt="">
              <p class="text-center">Opps ! No items was found. Sorry.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropDown from "../components/Inventories/DropDown.vue";
import ActionButtons from "../components/Inventories/ActionButtons.vue";
// import Search from "../components/Inventories/Search.vue";
import Inventories_list from "../components/Inventories/Inventories.vue";
import Create from "../components/Inventories/Create.vue";
import DeleteEditNavigator from "../components/Helper/DeleteEditNavigator.vue";
// import Loader from "../components/Helper/Loader.vue";
import axios from "axios";
export default {
  name: "Inventories",
  components: {
    DropDown,
    ActionButtons,
    Inventories_list,
    DeleteEditNavigator,
    Create,
  },
  data() {
    return {
      all_ready: true,
      edit: false,
      inventories: false,
      price: false,
      deleteId: [],
      editNav: false,
      deleteReady: false,
      deleteCancleEvent: false,
      search: "",
      search_item: "",
      today_history: false,
      today_history_counter: [],
      todayHistoryCreateRequest: false,
      todayHistoryCancleEvent: false
    };
  },
  created() {
    this.all();
  },
  methods: {
    editor() {
      this.edit = !this.edit;
      this.today_history = false;
      this.todayHistoryClose();
      this.editNav = true;
      if (!this.edit) {
        this.deleteId = [];
      }
    },
    all() {
      this.all_ready = true;
      axios
        .get("getting_inventories")
        .then((response) => {
          this.inventories = response.data;
          this.search_item = response.data;
          this.all_ready = false;
        })
        .catch((error) => {
          this.all_ready = true;
          console.log(error);
        });
    },
    price_handler() {
      this.search_item.sort((a, b) => {
        return b.price - a.price;
      });
    },
    newest_handler(condition) {
      // oldest and newest
      this.search_item.sort(function (x, y) {
        let date1 = new Date(x.created_at);
        let date2 = new Date(y.created_at);
        if (condition) {
          return date2 - date1;
        } else {
          return date1 - date2;
        }
      });
    },
    deleteHandler(v) {
      if (this.deleteId.includes(v)) {
        this.deleteId = this.deleteId.filter((e) => e != v);
      } else {
        this.deleteId.push(v);
      }
    },
    deleteConfirm() {
      this.deleteReady = true;
      axios
        .post("inventory/delete", {
          id: this.deleteId,
        })
        .then((response) => {
          let holder = this.inventories.filter(
            (e) => !response.data.ids.includes(e.id)
          );
          this.search_item = holder;
          this.inventories = holder;
          this.deleteId = [];
          this.deleteReady = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    pusher(v) {
      let holder = [v, ...this.inventories];
      this.search_item = holder;
      this.inventories = holder;
    },
    deleteCancle() {
      this.deleteId = [];
      this.deleteCancleEvent = true;
    },
    // searcher() {
    //   this.inventories.filter((inventory) => {
    //     return inventory.item_name.match(this.search);
    //   });
    // },
    edit_success(v) {
      let objIndex = this.search_item.findIndex((obj) => obj.id == v.id);
      this.search_item[objIndex].item_name = v.item_name;
      this.search_item[objIndex].price = v.price;
      this.search_item[objIndex].qty = v.qty;
      this.search_item[objIndex].actual_price = v.actual_price;
      this.search_item[objIndex].order_available = v.order_available;
    },
    todayHistoryCount(v) {
      if (this.today_history_counter.includes(v)) {
        this.today_history_counter = this.today_history_counter.filter(
          (e) => e != v
        );
      } else {
        this.today_history_counter.push(v);
      }
    },
    todayHistoryHandler() {
      this.today_history = !this.today_history;
      this.edit = false;
      this.deleteId = [];
    },
    todayHistoryClose(v) {
      if (v) {
        v.forEach(element => {
          let objIndex = this.search_item.findIndex((obj) => obj.id == element.inventory_id);
          this.search_item[objIndex].qty = this.search_item[objIndex].qty - element.qty;
        });
      }
      this.today_history_counter = [];
      this.todayHistoryCreateRequest = false

    },
    todayHistoryCancle() {
      this.todayHistoryClose()
      this.todayHistoryCancleEvent = true
    }
  },
  watch: {
    search() {
      this.search_item = this.inventories.filter((e) => {
        return e.item_name
          .split(" ")
          .join("")
          .toLowerCase()
          .includes(
            this.search.split(" ").join("").toLowerCase().toLowerCase()
          );
      });
    },
  },
};
</script>

<style>
</style>