/**
 * 按钮权限指令，用于判定按钮是否可见
 * 注：当 v-auth 指令不传值时，作用相当于 hidden 属性
 * @param {*} Vue
 */
export default function install(Vue) {
  Vue.directive('auth', {
    // 被绑定元素插入父节点时调用
    inserted(el, binding) {
      authVerify(el, binding)
    },
    // 所在组件的 vNode 更新时调用
    update(el, binding) {
      // 指令传入的新、旧值不一致时进行权限校验，以提升性能
      if (JSON.stringify(binding.value) !== JSON.stringify(binding.oldValue)) {
        authVerify(el, binding)
      }
    }
  })
}

// 权限校验
function authVerify(el, binding) {
  let authList = []
  if (binding.value) {
    authList = getAuthList(binding.value)
  }
  const elText = el.innerText.trim()
  const authType = buttonTypes.find((item) => item.label === elText)?.value
  const authIndex = authList.findIndex((authItem) => authItem === authType)
  el.style.display = authIndex === -1 ? 'none' : ''
}

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

/**
 * 获取权限列表
 * @param {object | undefined} authParams 包含参数 { id, flowStatus, creatorId, todoMessageList } 分别表示 { 详情 id, 流程状态, 创建者 id, 待办信息列表 }。
 * @returns 权限列表 eg: ['submitOrApprove', 'save', 'abort', 'delete']
 */
function getAuthList(authParams = {}) {
  let { creatorId, flowStatus, todoMessageList, id } = authParams
  const authList = []
  // 当前登录用户 id，实际项目应该从 Vuex 中获取
  const userId = '10086'
  // 是否为创建者（创建者 id 不存在说明是新建操作，也符合创建者的定义）
  const isCreator = (!creatorId && !id) || creatorId === userId
  // 当前流程状态
  flowStatus = flowStatus ? Number(flowStatus) : 0
  // 当前用户待办信息列表长度
  const todoMessageListLength = todoMessageList?.length

  // 「提交」「审批」按钮权限
  ;(todoMessageListLength || flowStatus === 0) && authList.push('submitOrApprove')
  // 「保存草稿」按钮权限
  isCreator && flowStatus === 0 && authList.push('save')
  // 「终止审批」按钮权限
  id && isCreator && ![0, 2, 4].includes(flowStatus) && authList.push('abort')
  // 「删除」按钮权限
  id && isCreator && [0, 4].includes(flowStatus) && authList.push('delete')
  return authList
}
