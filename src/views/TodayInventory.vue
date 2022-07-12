<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-8">
                <h5>ဒီနေ့ထပ်တိုးပစ္စည်းများ</h5>
                <table class="table table-success table-striped">
                    <thead>
                        <tr>
                            <td>Item Name</td>
                            <td>Quantity</td>
                            <td>Actual Price</td>
                            <td>Sub Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in datas" :key="data.id">
                            <td>{{data.inventory.item_name}}</td>
                            <td>{{data.qty}} ခု</td>
                            <td>{{data.inventory.actual_price}} ကျပ်</td>
                            <td>{{data.inventory.actual_price * data.qty}} ကျပ်</td>
                        </tr>
                        <tr>
                            <td colspan="3" class="text-end">Total</td>
                            <td>{{datas.reduce((a , e) => a + (e.qty * e.inventory.actual_price),0)}} ကျပ်</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'TodayInventory',
    data(){
        return {
            datas : []
        }
    },
    created(){
        this.all()
    },
    methods : {
        all(){
            axios.get('http://localhost:8000/api/inventory/today')
            .then((response)=>{
                this.datas = response.data
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    }
}
</script>

<style>
</style>