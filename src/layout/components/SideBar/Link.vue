<template>
  <component :is="type"
             v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script>
  // 通过export方式导出，在导入时要加{}，export default则不需要
  import { isExternal } from '@/utils/validate'
  export default {
    name: 'AppLink',
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    computed: {
      isExternal() {
        return isExternal(this.to)
      },
      type() {
        if (this.isExternal) {
          return 'a'
        } else {
          return 'router-link'
        }
      },
    },
    methods: {
      linkProps(to) {
        if (this.isExternal) {
          return {
            href: to,
            target: '_blank',
          }
        }
        return {
          to: to,
        }
      },
    },
  }
</script>

<style>
</style>