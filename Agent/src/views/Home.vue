/**
* Created by qqwan on 2018/4/18.
*/
<template>
    <div id="home" title="home layout">
      <el-button size="small" type="primary" @click="getContent">Get Text</el-button>
      {{hcontent}}
      <v-chat></v-chat>
    </div>

</template>

<script>
import vChat from './chat/chat'
export default {
  data () {
    return {
      hcontent: ''
    }
  },
  components: {vChat},
  methods: {
    getContent () {
      import(/* webpackChunkName: 'jquery' */ 'jquery').then(($) => {
        this.hcontent = $('#home').attr('title')
      })
    }
  }
}
</script>
