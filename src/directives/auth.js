// 权限校验
function authVerify(el, binding) {
  // 指令不传值或传值为空时，默认拥有权限
  if (!binding.value) {
    binding.value = ['', ['*']]
  }
  // 判断传入的值是否合法
  if (
    binding.value instanceof Array &&
    typeof binding.value[0] === 'string' &&
    Array.isArray(binding.value[1])
  ) {
    const authType = binding.value[0]
    const authList = binding.value[1]
    if (authList.includes('*')) {
      el.style.display = ''
    } else {
      const authElIndex = authList.findIndex(
        (authItem) => authItem === authType
      )
      el.style.display = authElIndex === -1 ? 'none' : ''
    }
  } else {
    Promise.reject(
      `v-auth 指令绑定的值不合法，绑定值格式如下： ['authType', authList]`
    )
  }
}

export default function install(Vue) {
  Vue.directive('auth', {
    // 被绑定元素插入父节点时调用
    inserted(el, binding) {
      authVerify(el, binding)
    },
    // 所在组件的 vNode 更新时调用
    update(el, binding) {
      // 指令传入的新、旧值不一致时进行权限校验，以提升性能
      if (binding.value?.toString() !== binding.oldValue?.toString()) {
        authVerify(el, binding)
      }
    }
  })
}
