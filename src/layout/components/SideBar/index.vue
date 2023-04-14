<template>
  <div>
    <Logo />
    <el-scrollbar>
      menu
    </el-scrollbar>
  </div>
</template>

<script>
  import Logo from './Logo.vue'
  export default {
    name: 'SideBar',
    components: { Logo },
  }
</script>

<style>
</style>