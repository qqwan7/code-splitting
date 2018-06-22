/**
* Created by qqwan on 2018/6/7.
*/
<template>
    <div>
      <ul id="messages">
        <li v-for="(msg, index) in msgs" :key="index">
          {{msg}}
        </li>
      </ul>
      <form @submit.prevent="sendToParents">
        <input v-model="message" placeholder="在此输入信息"/>
        <el-button size="small" type="primary">发送</el-button>
      </form>
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
<style scoped>
  #messages {
    list-style-type: none;
    margin: 0;
    padding: 0
  }
  #messages li {
    padding: 5px 10px
  }
  #messages li:nth-child(odd) {
    background: #eee
  }
  form {
    background: #000;
    padding: 3px;
    position: fixed;
    bottom: 60px;
    left: 250px;
    right: 20px;
  }
  form input {
    border: 0;
    padding: 10px;
    width: 88%;
  }
  form button {
    width: 9%;
  }
</style>
