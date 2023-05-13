<!--
  按钮权限组件，用于判定按钮是否可见
  注：当不传入 authParams 参数时，作用相当于按钮加上了 hidden 属性
-->
<script>
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
 * @param {object | undefined} authParams
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
export default {
  name: 'Auth',
  // 表明该组件是函数式组件
  functional: true,
  props: {
    // 按钮权限判定所需参数。包含参数 { id, flowStatus, creatorId, todoMessageList } 分别表示 { 详情 id, 流程状态, 创建者 id, 待办信息列表 }。
    authParams: {
      type: Object,
      default: undefined
    },
    // 受权限控制的标签名。默认 <button> 标签受到权限控制
    authTag: {
      type: String,
      default: 'button'
    }
  },
  render(h, context) {
    const { props, children } = context
    const { authParams, authTag } = props

    let authList = []
    if (authParams) {
      authList = getAuthList(authParams)
    }

    // 过滤出符合条件的 vNode
    const authVNode = children.filter((vNode) => {
      const authType = buttonTypes.find((item) => item.label === vNode.children?.[0]?.text)?.value
      return vNode.tag === authTag ? authList.includes(authType) : true
    })

    return authVNode
  }
}
</script>
