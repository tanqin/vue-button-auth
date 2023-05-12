<script>
export default {
  name: 'Auth',
  // 表明该组件是函数式组件
  functional: true,
  props: {
    // 权限列表
    authList: {
      type: Array,
      required: true
    },
    // 受权限控制的标签名。默认 <button> 标签受到权限控制
    authTag: {
      type: String,
      default: 'button'
    }
  },
  render(h, context) {
    const { props, children } = context
    const { authList, authTag } = props

    if (authList.includes('*')) {
      // 拥有所有权限
      return children
    } else {
      // 过滤出符合条件的 vNode
      let authVNode = children.filter((vNode) =>
        vNode.tag === authTag
          ? authList.includes(vNode.data?.attrs?.authType)
          : true
      )

      // 查找 authTag 类型 vNode 首次出现的索引
      const firstAuthTagIndex = authVNode.findIndex(
        (vNode) => vNode.tag === authTag
      )

      // 过滤以确保第一个 vNode 是 authTag 类型
      if (![-1, 0].includes(firstAuthTagIndex)) {
        authVNode = authVNode.slice(firstAuthTagIndex)
      }

      return authVNode
    }
  }
}
</script>
