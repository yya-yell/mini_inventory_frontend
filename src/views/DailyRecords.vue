<template>
    <div>
        <DailyRecordListVue :datas="dates" :inventories="inventories"/>
    </div>


</template>

<script>
import axios from 'axios'
import DailyRecordListVue from '../components/DailyRecords/DailyRecordList.vue'
export default {
    name: 'Daily_Record',
    components : {DailyRecordListVue},
    data(){
        return {
            dates : [],
            inventories : []
        }
    },  
    created(){
        this.all()
    },
    methods : {
        all(){
            axios.get('http://localhost:8000/api/records/daily')
            .then((response)=>{
                this.dates = response.data.data
                this.inventories = response.data.daily_inventory
            })
            .catch((error)=>{
                console.log(error.response)
            })
        }
    }
}
</script>

<style>
</style>