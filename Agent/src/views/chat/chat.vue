/**
* Created by qqwan on 2018/6/7.
*/
<template>
    <div>
      <div class="par">
        <div class="child"></div>
        <button class="btn-normal font-1">提交</button>
        <button class="btn-green font-2">提交</button>
        <button class="btn-normal-radius font-3">提交</button>
        <button class="btn-green-radius font-4">提交</button>
        <div class="logo"></div>
      </div>
      <ul id="messages">
        <li v-for="(msg, index) in msgs" :key="index">
          {{msg}}
        </li>
      </ul>
      <form @submit.prevent="sendToParents">
        <input v-model="message" placeholder="在此输入信息"/>
        <el-button size="small" type="primary">发送</el-button>
      </form>
      <div class="alert-box-bg "></div>
      <div class="alert-box-meeting background-green">
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      msgs: []
    }
  },
  sockets: {
    'socketLog': function (val) { // capture 捕获服务端socketLog
      console.log('-----------' + val)
      this.msgs.push(val)
    }
  },
  methods: {
    sendToParents: function () {
      this.$socket.emit('socketLog', this.message) // 向服务器socketLog监听发送信息
      this.message = ''
    }
  }
}
</script>
<style scoped lang="less">
  //http://lesscss.cn/features/
 @import "../../assets/style/chat";
</style>
