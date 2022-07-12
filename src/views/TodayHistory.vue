<template>
  <p>နေ့အတွက်ရောင်းရသော စာရင်းများ</p>
  <div class="container">
    <div class="row">
      <div class="d-flex">
        <p class="text-info font-weight-bold p-2 rounded bg-dark">ဒီနေ့ရောင်းရငွေ <span class="text-success">({{ sum }})</span> ကျပ်</p>
        <p class="text-info font-weight-bold p-2 mx-3 rounded bg-dark">ဒီနေ့အမြတ်ငွေ <span class="text-success">({{
            todayDemand
        }})</span> ကျပ်</p>
      </div>
      <div v-for="(todayHistory, index) in todayHistories" :key="todayHistory.id" class="col-8  p-3 rounded my-3">
        <div>
          <p class="text-secondary">{{ date(index) }}</p>
          <div class="d-flex justify-content-end">
            <div v-if="index !== inputFormState">
              <button class="btn btn-transparent"><i class="fas fa-download"></i></button>
              <button class="btn btn-transparent" @click="inputFormStateHandler(index, todayHistory)">
                <i class="fas fa-edit"></i></button>
            </div>
            <div v-if="index == inputFormState">
              <button class="btn btn-transparent" @click="TodayHistoryEditRequest(todayHistory)">
                <i class="fas fa-check text-success "></i></button>
              <button class="btn btn-transparent" @click="inputFormStateHandler(null, null, index)">
                <i class="fas fa-times text-danger"></i></button>
            </div>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Item Name</th>
                <th scope="col">Qutantity</th>
                <th scope="col">Price</th>
                <th scope="col">SubTotal</th>
                <th scope="col">Note</th>
                <th scope="col">အမြတ်</th>
                <th scope="col" class="text-center" v-if="index == inputFormState">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(eachHistory, i) in todayHistory" :key="i">
                <td>{{ eachHistory.inventory.item_name }}</td>
                <td>
                  <span v-if="index !== inputFormState">{{ eachHistory.qty }} </span>
                  <div class="d-flex" v-if="index == inputFormState">
                    <button class="btn btn-primary" :ref="'incrementBtnOf' + eachHistory.id"
                      @click="qtyControler('add', eachHistory.id, eachHistory.inventory.qty + eachHistory.qty)">+</button>
                    <input type="text" class="form-control mx-2 col-3 text-center" :ref="'qtyOf' + eachHistory.id"
                      :value="eachHistory.qty" readonly>
                    <button class="btn btn-info" :ref="'decrementBtnOf' + eachHistory.id"
                      @click="qtyControler('sub', eachHistory.id)">-</button>
                  </div>
                </td>
                <td>{{ eachHistory.inventory.price }}</td>
                <td>{{ eachHistory.sub_total }}</td>
                <td>
                  <span v-if="index !== inputFormState">{{ eachHistory.note }} </span>
                  <input v-if="index == inputFormState" type="text" class="form-control"
                    placeholder="To add or remove note" :value="eachHistory.note" :ref="'noteOf' + eachHistory.id" />
                </td>
                <td>{{ eachHistory.sub_total - (eachHistory.qty * eachHistory.inventory.actual_price) }}</td>
                <td class="d-flex justify-content-center" v-if="index == inputFormState">
                  <button @click="returnDelete(index, eachHistory.id)"
                    class="btn btn-danger btn-sm mx-2">Return</button>
                  <button @click="wasteDelete(index, eachHistory.id)" class="btn btn-sm btn-danger">Waste</button>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-end">ကျသင့်ငွေ</td>
                <td class="table-active" colspan="2">{{ todayHistory.reduce((a, c) => { return a + c.sub_total }, 0) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import axios from "axios";
export default {
  name: "TodayHistory",
  data() {
    return {
      todayHistories: [],
      sum: '',
      inputFormState: null,
      dataHolder: [],
      todayDemand: '',
      todaySupply: ''
    };
  },
  created() {
    this.allHistory();
  },
  methods: {
    allHistory() {
      axios
        .get("todayhistory/all")
        .then((response) => {
          this.todayHistories = response.data.todayHistory;
          this.sum = response.data.sum
          this.todayDemand = response.data.today_demand
          this.todaySupply = response.data.today_supply
        })
        .catch((error) => {
          console.log(error);
        });
    },
    date(d) {
      return formatDistanceToNow(new Date(d), { addSuffix: true })
    },
    inputFormStateHandler(v, k) {
      this.inputFormState = v
      if (k) {
        this.dataHolder = k
      } else {
        this.dataHolder = []
      }
    },
    DATAHOLDER_PREPARE_RESET(id, noteValue, qtyValue) {
      // console.log('function ', )
      let index = this.dataHolder.findIndex(i => i.id == id)
      this.dataHolder[index].note = noteValue
      this.dataHolder[index].qty = qtyValue
      this.dataHolder[index].sub_total = qtyValue * this.dataHolder[index].inventory['price']
    },
    TodayHistoryEditRequest(value) {
      console.log('value ', value)
      value.forEach(e => {
        this.DATAHOLDER_PREPARE_RESET(e.id, this.$refs['noteOf' + e.id][0].value, this.$refs['qtyOf' + e.id][0].value)
      })
      axios.put('todayhistory/edit', {
        'data': this.dataHolder
      }).then((response) => {
        this.sum = response.data.sum
        this.inputFormState = null
        this.dataHolder = []
      })
        .catch((error) => {
          console.log(error.response)
        })
    },
    qtyControler(action, id, max) {
      if (action == 'add') {
        this.$refs['qtyOf' + id][0].value++
        this.$refs['decrementBtnOf' + id][0].disabled = false
        if (this.$refs['qtyOf' + id][0].value == max) {
          this.$refs['incrementBtnOf' + id][0].disabled = true
        }
      } else if (action == 'sub') {
        this.$refs['qtyOf' + id][0].value--
        this.$refs['incrementBtnOf' + id][0].disabled = false
        if (this.$refs['qtyOf' + id][0].value == 1) {
          this.$refs['decrementBtnOf' + id][0].disabled = true
        }
      }
    },
    returnDelete(index, id) {
      axios.post('todayhistory/delete/return', {
        'id': id
      }).then((response) => {
        this.AFTER_DELETE_RESPONSE(index, response.data.sum, response.data.id)
      })
    },
    wasteDelete(index, id) {
      axios.post('todayhistory/delete/waste', {
        'id': id
      }).then((response) => {
        this.AFTER_DELETE_RESPONSE(index, response.data.sum, response.data.id)
      }).catch((error) => {
          console.log(error)
        })
    },
    AFTER_DELETE_RESPONSE(index, sum_response, deleted_id) {
      this.sum = sum_response
      if (this.todayHistories[index].length == 1) {
        delete this.todayHistories[index]
      } else if (this.todayHistories[index].length > 1) {
        this.todayHistories[index] = this.todayHistories[index].filter(e => e.id !== deleted_id)
      }
      this.dataHolder = this.dataHolder.filter(e => e.id != deleted_id)
    }
  },
};
</script>

<style>
</style>