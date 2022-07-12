<template>
    <button class="btn btn-outline-info mx-2" @click="editHandler()">
      <span v-if="edit_text">Edit</span> <span v-if="!edit_text">Done</span> 
    </button>
  <button class="btn btn-warning mx-2 d-none" id="Done">Done</button>
  <button class="btn btn-outline-success mx-2" @click="$emit('today_history') , edit_text = true" id="th_show_select">
    Create Today History
  </button>
</template>

<script>
export default {
  name: "ActionButtons",
  emits : ['edit' , 'today_history'],
  data(){
      return {
          edit_text : true,
      }
  },
  methods : {
      editHandler(){
          this.$emit('edit')
          this.edit_text = !this.edit_text
      },
}
};
</script>

<style>
</style>