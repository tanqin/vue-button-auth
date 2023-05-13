<template>
  <div id="app">
    <h1>前端按钮权限控制设计</h1>
    <b>说明：按钮种类包括「审批」「提交」「保存草稿」「终止」「删除」</b>
    <p>假设当前登录用户 id：10086</p>
    <form action="">
      <label for="flow-status">
        详情 id：
        <input type="text" v-model="form.id" />
      </label>
      <label for="flow-status">
        流程状态：
        <select id="flow-status" v-model="form.flowStatus">
          <option v-for="item in enums.flowStatusTypes" :key="item.value" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </label>
      <label for="flow-status">
        创建者 id：
        <input type="text" v-model="form.creatorId" />
      </label>
      <label for="to-do">
        当前用户是否有待办数据：
        <select id="to-do" v-model="form.todoMessageList">
          <option v-for="item in enums.todoMessageListTypes" :key="JSON.stringify(item.value)" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </label>
    </form>
    <i>所有可能出现的情况（尚未考虑已结束、待发布状态）：</i>
    <ol>
      <li>登录用户新建时，没有详情 id，流程状态一定为空，创建者 id 一定为空，待办一定无数据，此时说明登录用户就是创建者，可以操作「提交」「保存草稿」按钮；</li>
      <li>登录用户进入详情时，有详情 id，流程状态为草稿，创建者 id 与登录用户 id 一定相同，待办一定无数据，可以操作「提交」「保存草稿」「删除」按钮；</li>
      <li>登录用户进入详情时，有详情 id，流程状态为审核中，创建者 id 与登录用户 id 相同，待办无数据，可以操作「审批」「终止」按钮；</li>
      <li>登录用户进入详情时，有详情 id，流程状态为审核中，创建者 id 与登录用户 id 相同，待办有数据，可以操作「终止」按钮；</li>
      <li>登录用户进入详情时，有详情 id，流程状态为审核中，创建者 id 与登录用户 id 不同，待办无数据，没有可以操作的按钮；</li>
      <li>登录用户进入详情时，有详情 id，流程状态为审核中，创建者 id 与登录用户 id 不同，待办有数据，可以操作「审批」的按钮；</li>
      <li>登录用户进入详情时，有详情 id，流程状态为已完成，创建者 id 与登录用户 id 不管是否相同，待办一定无数据，没有可以操作的按钮；</li>
      <li>登录用户进入详情时，有详情 id，流程状态为已终止，创建者 id 与登录用户 id 相同，待办一定无数据，可以操作「删除」按钮；</li>
      <li>登录用户进入详情时，有详情 id，流程状态为已终止，创建者 id 与登录用户 id 不同，待办一定无数据，没有可以操作的按钮；</li>
    </ol>
    <hr />
    <div class="container">
      <h2>组件方式</h2>
      <Auth :authParams="authParams">
        <button>{{ form.flowStatus ? '审批' : '提交' }}</button>
        <button>保存草稿</button>
        <button>终止</button>
        <button>删除</button>
      </Auth>
    </div>
    <div class="container">
      <h2>指令方式</h2>
      <button v-auth="authParams">{{ form.flowStatus ? '审批' : '提交' }}</button>
      <button v-auth="authParams">保存草稿</button>
      <button v-auth="authParams">终止</button>
      <button v-auth="authParams">删除</button>
      <!-- 也可以直接将按钮权限判定所需参数直接绑定到指令上，但是由于这么些太长，还是统一抽离比较好 -->
      <!-- <button v-auth="{ id: form.id, flowStatus: form.flowStatus, creatorId: form.creatorId, todoMessageList: form.todoMessageList }">{{ form.flowStatus ? '审批' : '提交' }}</button>
      <button v-auth="{ id: form.id, flowStatus: form.flowStatus, creatorId: form.creatorId, todoMessageList: form.todoMessageList }">保存草稿</button>
      <button v-auth="{ id: form.id, flowStatus: form.flowStatus, creatorId: form.creatorId, todoMessageList: form.todoMessageList }">终止</button>
      <button v-auth="{ id: form.id, flowStatus: form.flowStatus, creatorId: form.creatorId, todoMessageList: form.todoMessageList }">删除</button> -->
    </div>
  </div>
</template>

<script>
import { flowStatusTypes, todoMessageListTypes } from '@/enums/index'
export default {
  name: 'App',
  data() {
    return {
      form: {
        id: undefined,
        flowStatus: undefined,
        creatorId: undefined,
        todoMessageList: undefined
      },
      enums: {
        flowStatusTypes,
        todoMessageListTypes
      }
    }
  },
  computed: {
    // 按钮权限判定所需参数
    authParams() {
      return {
        // 详情 id
        id: this.form.id,
        // 流程状态
        flowStatus: this.form.flowStatus,
        // 创建者 id
        creatorId: this.form.creatorId,
        // 待办信息列表
        todoMessageList: this.form.todoMessageList
      }
    }
  }
}
</script>

<style>
.container {
  height: 80px;
}
button {
  margin-right: 10px;
}
</style>
