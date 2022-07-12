<template>
    <div class="alert text-capitalize" :class="condition" role="alert">
       <slot></slot>
    </div>
</template>

<script>
export default {
    name : 'Alert',
    props : ['condition']
}
</script>

<style>
</style>