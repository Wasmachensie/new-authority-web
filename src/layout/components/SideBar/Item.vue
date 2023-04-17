<script>
  export default {
    name: 'MenuItem',
    functional: true,
    props: {
      icon: {
        type: String,
        default: '',
      },
      title: {
        type: String,
        default: '',
      },
    },
    render(createElement, context) {
      const { icon, title } = context.props
      const vnodes = []
      if (icon) {
        vnodes.push
      }
      if (title) {
        vnodes.push(<span>{title}</span>)
      }
      return vnodes
    },
  }
</script>

<style>
</style>