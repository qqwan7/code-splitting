/**
* Created by qqwan on 2018/4/17.
*/
<template>
  <div class="login-content">
    <div class="top-logo">
      <span class="bg-pic bg-logo"></span>
      <span class="logo-title">{{$t('common.agent_portal')}}</span>
    </div>
    <div class="login-box" @keypress.enter="signInForm">
      <div class="gwn-logo"></div>
      <div class="login-logo">
        {{$t('common.agent_portal')}}
      </div>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="0" class="loginForm">
        <el-form-item prop="username">
          <el-input type="text" :placeholder="$t('login.account')" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" :placeholder="$t('login.password')" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!--<el-form-item prop="validateCode" v-if="showCode" class="validate-code">-->
          <!--<el-input type="text" class="auth-code" v-model="loginForm.validateCode"></el-input>-->
          <!--<img :title="$t('login.validTip')" @click="refreshCode" :src="imgSrc"/>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="signInForm('loginForm')" :loading="loading">{{$t('login.sign_in')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vFooter from '@/components/footer/Footer'
import { Message } from 'element-ui'
import { login } from '@/api/user'
import cookie from 'js-cookie'
export default {
  name: 'login',
  data () {
    return {
      showCode: false,
      loading: false,
      //      imgSrc: '/admin/code/generateCode?type=1',
      loginForm: {
        username: '',
        password: ''
      //        validateCode: ''
      },
      loginFormRules: {
        username: [{required: true, message: this.$t('validate.username_not_empty'), trigger: 'blur'}],
        password: [{required: true, message: this.$t('validate.password_not_empty'), trigger: 'blur'}]
      //        validateCode: [{required: true, message: this.$t('validate.validatecode_not_empty'), trigger: 'blur'}]
      }
    }
  },
  components: {
    vFooter
  },
  sockets: {
    'broadcastMsg': function (val) { // capture 捕获服务端socketLog
      console.log('-----------' + val)
      Message.success(val)
    }
  },
  methods: {
    // 点击登录按钮
    signInForm () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          login(this.loginForm).then(res => {
            this.loading = false
            console.log('=========' + res)
            cookie.set('name', 'admin', { expires: 60 * (1 / 1440) })
            this.$router.push({ path: 'par3' })
          }).catch((res) => {
            console.log('====error=====' + res)
            Message.error(res.msg)
            if (res.retCode === 50014) {
              this.showCode = true
            }
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
    //    // 点击刷新验证码
    //    refreshCode () {
    //      let num = new Date().getTime()
    //      this.imgSrc = '/admin/code/generateCode?type=1&time=' + num
    //    }
  },
  mounted () {
    // require('socket.io')()
  }
}

</script>
