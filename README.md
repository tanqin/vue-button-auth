# vue-button-auth

前端按钮权限控制设计

**组件方式**

```html
 <!-- authParams 表示按钮权限判定所需参数。包含参数 { id, flowStatus, creatorId, todoMessageList } 分别表示 { 详情 id, 流程状态, 创建者 id, 待办信息列表 }。 -->
<Auth :authParams="authParams">
  <button>审批</button>
  <button>提交</button>
  <button>保存草稿</button>
  <button>终止审批</button>
  <button>删除</button>
</Auth>
```

**指令方法**

```html
<!-- authParams 表示按钮权限判定所需参数。包含参数 { id, flowStatus, creatorId, todoMessageList } 分别表示 { 详情 id, 流程状态, 创建者 id, 待办信息列表 }。 -->
<button v-hasAuth="authParams">审批</button>
<button v-hasAuth="authParams">提交</button>
<button v-hasAuth="authParams">保存草稿</button>
<button v-hasAuth="authParams">终止审批</button>
<button v-hasAuth="authParams">删除</button>
```

示例参数：

```js
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
```

## 安装依赖

```shell
yarn
```

### 运行

```shell
yarn dev
```

### 打包

```shell
yarn build
```

### 格式修复

```shell
yarn lint
```
