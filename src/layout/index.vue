<template>
  <div>
    <side-bar></side-bar>
    <div>
      <nav-bar></nav-bar>
      <tags-view></tags-view>
    </div>
    <app-main></app-main>
  </div>
</template>

<script>
  import AppMain from './components/AppMain.vue'
  import NavBar from './components/NavBar.vue'
  import SideBar from './components/SideBar/index.vue'
  import TagsView from './components/TagsView/index.vue'
  export default {
    name: 'Layout',
    components: { SideBar, NavBar, TagsView, AppMain },
    mounted() {
      console.log('layout.vue=>', this.$store.state.user.token)
    },
  }
</script>

<style>
</style>