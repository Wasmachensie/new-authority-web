<template>
  <div>layout</div>
</template>

<script>
  export default {
    name: 'Layout',
    mounted() {
      console.log('layout.vue=>', this.$store.state.user.token)
    },
  }
</script>

<style>
</style>