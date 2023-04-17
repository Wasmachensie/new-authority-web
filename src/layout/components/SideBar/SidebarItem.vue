<template>
  <div v-if="!item.hidden">

    <el-menu-item :index="item.path"
                  v-if="!item.children">

      <menu-item :icon="item.meta.icon"
                 :title="item.meta.title" />
    </el-menu-item>

    <el-submenu v-else
                :index="item.path">
      <template slot="title">
        <!-- 图标 -->
        <!-- <i class="el-icon-lacation"></i> -->
        <!-- <span>{{item.name}}</span> -->
        <menu-item :icon="item.meta.icon"
                   :title="item.meta.title" />
      </template>
      <sidebar-item v-for="child in item.children"
                    :key="child.path"
                    :item="child" />
    </el-submenu>

  </div>

</template>

<script>
  import MenuItem from './Item'

  export default {
    name: 'SidebarItem',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    components: { MenuItem },
  }
</script>

<style>
</style>