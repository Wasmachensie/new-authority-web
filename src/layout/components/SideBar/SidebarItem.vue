<template>
  <div v-if="!item.hidden">

    <template v-if="!item.children">
      <app-link :to="basePath">
        <el-menu-item :index="basePath">

          <menu-item :icon="item.meta.icon"
                     :title="item.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else
                :index="basePath">
      <template slot="title">
        <!-- 图标 -->
        <!-- <i class="el-icon-lacation"></i> -->
        <!-- <span>{{item.name}}</span> -->
        <menu-item :icon="item.meta.icon"
                   :title="item.meta.title" />
      </template>
      <sidebar-item v-for="child in item.children"
                    :key="child.path"
                    :item="child"
                    :base-path="resolvePath(child.path)" />
    </el-submenu>

  </div>

</template>

<script>
  import { isExternal } from '@/utils/validate'
  import path from 'path'
  import MenuItem from './Item'
  import AppLink from './Link'

  export default {
    name: 'SidebarItem',
    props: {
      item: {
        type: Object,
        required: true,
      },
      basePath: {
        type: String,
        default: '',
      },
    },
    components: { MenuItem, AppLink },
    methods: {
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routePath)
      },
    },
  }
</script>

<style>
</style>