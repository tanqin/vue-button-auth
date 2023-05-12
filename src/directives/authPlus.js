// 按钮类型
const buttonTypes = [
  {
    label: '审批',
    value: 'submitOrApprove'
  },
  {
    label: '提交',
    value: 'submitOrApprove'
  },
  {
    label: '保存草稿',
    value: 'save'
  },
  {
    label: '终止',
    value: 'abort'
  },
  {
    label: '删除',
    value: 'delete'
  }
]

// 权限校验
function authVerify(el, binding) {
  const elText = el.innerText.trim()
  const authType = buttonTypes.find((item) => item.label === elText)?.value
  if (!binding.value) {
    binding.value = ['*']
  }
  // 判断传入的值是否合法
  if (binding.value instanceof Array) {
    const authList = binding.value
    if (authList.includes('*')) {
      el.style.display = ''
    } else {
      const authIndex = authList.findIndex((authItem) => authItem === authType)
      el.style.display = authIndex === -1 ? 'none' : ''
    }
  } else {
    Promise.reject(`v-auth 指令绑定的值必须是 Array 类型`)
  }
}

export default function install(Vue) {
  Vue.directive('authPlus', {
    // 被绑定元素插入父节点时调用
    inserted(el, binding) {
      authVerify(el, binding)
    },
    // 所在组件的 vNode 更新时调用
    update(el, binding) {
      if (binding.value?.toString() !== binding.oldValue?.toString()) {
        authVerify(el, binding)
      }
    }
  })
}
