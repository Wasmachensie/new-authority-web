<template>
  <div class="sidebar-logo-container">
    <router-link to="/"
                 class="siderbar-logo-link">
      <img :src="logo"
           class="siderbar-logo" />
      <h1 class="siderbar-title">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
  import logoImg from '@/assets/logo/logo.png'
  export default {
    name: 'Logo',
    data() {
      return {
        logo: logoImg,
        title: '若依管理系统',
      }
    },
  }
</script>

<style scoped lang="scss">
  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    overflow: hidden;
    & .siderbar-logo-link {
      height: 100%;
      width: 100%;

      & .siderbar-logo {
        width: 32px;
        height: 32px;
        margin-right: 12px;
        vertical-align: middle;
      }
      & .siderbar-title {
        // 为了和img在同一行
        display: inline-block;
        margin: 0;
        line-height: 50px;
        vertical-align: middle;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
      }
    }
  }
</style>