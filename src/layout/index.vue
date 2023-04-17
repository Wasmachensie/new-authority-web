<template>
  <div class="app-wrapper">
    <side-bar class="sidebar-container"></side-bar>
    <div class="main-container">
      <nav-bar></nav-bar>
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
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

<style scoped lang="scss">
  // 导入
  @import '~@/assets/styles/variables.scss';
  .app-wrapper {
    width: 100%;
    height: 100%;
  }
  .sidebar-container {
    width: 200px;
    height: 100%;
    background: $base-menu-background;
    position: fixed;
  }
</style>