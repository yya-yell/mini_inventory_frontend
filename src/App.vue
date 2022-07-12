<template>
  <div>
    <layout/>
  </div>
</template>

<script>
import Layout from './components/Layout/Layout'
export default {
  name : 'App',
  components  : {Layout},
  data(){
    return{
      todayHistory_notifier : false
    }
  }
}
</script>

