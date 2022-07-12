<template>
    <div class="">
        <div class="row gap-4 justify-content-center mt-5">
            <div class="col-2">
                <div class="h-75 card border shadow border-success p-2 text-center">
                    <h5>{{ new Date().getMonth() + 1 }} လပိုင်းအရင်းငွေ</h5>
                    <div class="card-body">
                        <p>{{ supply }} ကျပ်</p>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="h-75 card border shadow p-2 text-center"
                    :class="demand < supply ? ' border-danger ' : 'border-info'">
                    <h5>{{ new Date().getMonth() + 1 }} လပိုင်းအသတင်အမြတ်ငွေ</h5>
                    <div class="card-body">
                        <p>{{ demand }} ကျပ်</p>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="h-75 card border shadow border-info p-2 text-center">
                    <h5>ပစ္စည်းအမျိုးအစားပေါင်း</h5>
                    <div class="card-body">
                        <p>{{ total_items }} ခု</p>
                    </div>
                </div>
            </div>
            <div class="col-2">
                <div class="h-75 card border shadow border-danger p-2 text-center">
                    <h5>ဆုံးရူံးမူပစ္စည်းများ</h5>
                    <div class="card-body">
                        <p>{{ wasted.length }} ခု</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center mt-5">
            <div class="col-10">
                <div class="row gx-5">
                    <div class="col-3">
                        <p>အရင်လမှ လက်ကျန်ပစ္စည်းများ</p>
                        <ul class="bg-white shadow rounded-lg py-3 card_scroller">
                            <li class="py-2 px-4">sundayကော်ဖီ <span class="float-end">3ခု</span> </li>
                            <li class="py-2 px-4">sundayကော်ဖီ <span class="float-end">3ခု</span> </li>
                            <li class="py-2 px-4">sundayကော်ဖီ <span class="float-end">3ခု</span> </li>
                            <li class="py-2 px-4">sundayကော်ဖီ <span class="float-end">3ခု</span> </li>
                            <li class="py-2 px-4">sundayကော်ဖီ <span class="float-end">3ခု</span> </li>
                            <li class="py-2 px-4">sundayကော်ဖီ <span class="float-end">3ခု</span> </li>
                            <li class="py-2 px-4">sundayကော်ဖီ <span class="float-end">3ခု</span> </li>
                            <li class="py-2 px-4">sundayကော်ဖီ <span class="float-end">3ခု</span> </li>
                            <li class="py-2 px-4">sundayကော်ဖီ <span class="float-end">3ခု</span> </li>
                            <li class="py-2 px-4">sundayကော်ဖီ <span class="float-end">3ခု</span> </li>
                            <li class="py-2 px-4">sundayကော်ဖီ <span class="float-end">3ခု</span> </li>
                            <li class="py-2 px-4">sundayကော်ဖီ <span class="float-end">3ခု</span> </li>
                        </ul>
                    </div>
                    <div class="col-5">
                        <p>ဆုံးရူံးမူ ပစည်းများ</p>
                        <div v-if="wasted.length" class="bg-white border border-danger shadow rounded-lg py-3 card_scroller">
                            <ul v-for="waste in wasted" :key="waste.id">
                                <li class="py-2 px-4">{{ waste.item_name }}
                                    <span class="px-2">{{ waste.qty }} ခု</span>
                                    <span class="px-2">{{ waste.actual_price }}အရင်း</span>
                                    <span class="px-2">{{ waste.price }}ရောင်းဈေး</span>
                                </li>
                            </ul>
                        </div>
                        <div class="text-center text-muted" v-else> * ဆုံးရူံးမူ ပစ္စည်းများ မရှိပါ </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Dashboard',
    data() {
        return {
            supply: '',
            demand: '',
            total_items: '',
            wasted: []
        }
    },
    created() {
        this.getDash()
    },
    methods: {
        getDash() {
            axios.get('http://localhost:8000/api/dashboard/main')
                .then((response) => {
                    this.supply = response.data.supply;
                    this.demand = response.data.demand;
                    this.total_items = response.data.total_items;
                    this.wasted = response.data.wasted
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
}
</script>

<style>
</style>