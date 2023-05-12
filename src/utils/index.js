// 获取权限列表
export function getAuthList(authInfo = {}) {
  let { creatorId, flowStatus, todoMessageList, id } = authInfo
  const authList = []
  // 当前登录用户 id
  const userId = '10086'
  // 是否为创建者（创建者 id 不存在说明是新建操作，也符合创建者的定义）
  const isCreator = (!creatorId && !id) || creatorId === userId
  // 当前流程状态
  flowStatus = flowStatus ? Number(flowStatus) : 0
  // 当前用户待办信息列表长度
  const todoMessageListLength = todoMessageList?.length

  // 「提交」「审批」按钮权限
  ;(todoMessageListLength || flowStatus === 0) &&
    authList.push('submitOrApprove')
  // 「保存草稿」按钮权限
  isCreator && flowStatus === 0 && authList.push('save')
  // 「终止审批」按钮权限
  id && isCreator && ![0, 2, 4].includes(flowStatus) && authList.push('abort')
  // 「删除」按钮权限
  id && isCreator && [0, 4].includes(flowStatus) && authList.push('delete')

  return authList
}
