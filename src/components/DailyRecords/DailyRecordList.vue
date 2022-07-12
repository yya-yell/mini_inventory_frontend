<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-4">Daily Records
                    <div class="card mt-3" style="width: 18rem;">
                        <ul class="list-group list-group-flush" v-for="(daily, date) in datas" :key="date">
                            <li class="list-group-item"
                                :class="lists == daily ? 'font-weight-bold text-primary bg-default' : ''"
                                @click="lists = daily, dateOf = date, ByDate(date)" style="cursor : pointer;">{{ date
                                }}</li>
                        </ul>
                    </div>
                </div>
                <div class="col-8">
                    <div>
                        <div class="d-flex justify-content-center" v-if="!lists.length">
                            <div>
                                <p>You need to select the date.</p>
                                <img src="../../assets/undraw_diary_re_4jpc.svg" class="w-50" />
                            </div>
                        </div>
                        <div v-if="lists.length">
                            {{ dateOf }}
                            <div>ရောင်းရငွေ <span class="text-success">({{lists.reduce((a , e) => a + (e.qty * e.inventory.price) , 0)}})</span> ကျပ် / အမြတ်ငွေ ({{lists.reduce((a , e) => a + (e.qty * (e.inventory.price -  e.inventory.actual_price)) , 0)}}) ကျပ်</div>
                            <div class="card card_scroller">
                                <table class="table table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <td>Item Name</td>
                                            <td>Quantity</td>
                                            <td>Actual Price</td>
                                            <td>Price</td>
                                        </tr>
                                    </thead>
                                    <tbody class=" card_scroller">
                                        <tr v-for="list in lists" :key="list.id">
                                            <td>{{ list.inventory.item_name }}</td>
                                            <td>{{ list.qty }}</td>
                                            <td>{{ list.inventory.actual_price }}</td>
                                            <td>{{ list.inventory.price }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-if="!daily_inventory.length" class="mt-5 py-2 text-secondary text-center">{{ dateOf }}နေ့တွင်
                                ၀ယ်ခဲ့သောပစ္စည်းမရှိပါ</div>
                            <div v-if="daily_inventory.length">
                                <div class="mt-5 py-2">{{ dateOf }}နေ့တွင် ၀ယ်ခဲ့သောပစ္စည်းများ /စုစုပေါင်းအရင်းတန်ဖိုး 
                                <span class="text-success">({{sumOfInventory}})</span>   ကျပ်</div>
                                
                                <table class="table table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <td>Item Name</td>
                                            <td>Quantity</td>
                                            <td>Actual Price</td>
                                            <td>Price</td>
                                        </tr>
                                    </thead>
                                    <tbody class=" card_scroller">
                                        <tr v-for="list in daily_inventory" :key="list.id">
                                            <td>{{ list.inventory.item_name }}</td>
                                            <td>{{ list.qty }}</td>
                                            <td>{{ list.inventory.actual_price }}</td>
                                            <td>{{ list.inventory.price }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'DailyRecordList',
    props: ['datas', 'inventories'],
    data() {
        return {
            lists: [],
            dateOf: '',
            daily_inventory: [],
            sumOfInventory : ''
        }
    },
    methods: {
        ByDate(date) {
            if (this.inventories[date]) {
                this.daily_inventory = this.inventories[date]
                this.sumOfInventory = this.daily_inventory.reduce((e , a)=> e + a.qty * a.inventory.actual_price , 0)
            } else {
                this.daily_inventory = []
            }
        }
    }
}
</script>

<style>
</style>