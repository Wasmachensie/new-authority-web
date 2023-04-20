<template>
  <div>
    <Logo />
    <el-scrollbar>
      <!-- 只保持一个子菜单的展开 -->
      <el-menu default-active="2"
               class="el-menu-vertical-demo"
               :background-color="variables.menuBackground"
               :unique-opened="true"
               text-color="#fff"
               active-text-color="#ffd04b">
        <sidebar-item v-for="(route,index) in sidebarRouters"
                      :key="route.path + index"
                      :item="route"
                      :base-path="route.path">
        </sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import variables from '@/assets/styles/variables.scss'
  import SidebarItem from '@/layout/components/SideBar/SidebarItem.vue'
  import { mapGetters } from 'vuex'
  import Logo from './Logo.vue'
  export default {
    name: 'SideBar',
    components: { Logo, SidebarItem },
    computed: {
      ...mapGetters(['sidebarRouters']),
      variables() {
        return variables
      },
    },
    methods: {},
  }
</script>