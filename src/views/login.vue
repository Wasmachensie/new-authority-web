<template>
  <div class="login">
    <el-form :model="loginForm"
             :rules="loginRules"
             ref="loginForm"
             class="login-form">

      <!-- 标题 -->
      <h3 class="title">后台管理系统</h3>

      <!-- 账号 -->
      <el-form-item prop="username">
        <el-input v-model="loginForm.username"
                  type="text"
                  placeholder="账号">
        </el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input v-model="loginForm.password"
                  type="password"
                  placeholder="密码">
        </el-input>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-input v-model="loginForm.code"
                  placeholder="验证码"
                  style="width: 63%">
        </el-input>

        <!-- 验证码图片 -->
        <div class="login-code">
          <img :src="codeUrl"
               class="login-code-img"
               @click="getCode" />
        </div>
      </el-form-item>

      <!-- 记住密码 -->
      <el-checkbox v-model="loginForm.rememberMe"
                   style="margin:0px 0px 25px 0px;">
        记住密码
      </el-checkbox>

      <!-- 登录按钮 -->
      <el-form-item style="width: 100%;">
        <!-- 当父组件中引入子组件的时候，当要触发子组件点击事件的时候@click不生效。 -->
        <el-button @click.native="handleLogin"
                   type="primary"
                   style="width: 100%;">
          <span>登 录</span>
        </el-button>
      </el-form-item>

    </el-form>

    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2023 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
  import { getCodeImg } from '../api/login'
  export default {
    name: 'login',
    data() {
      return {
        // 表单
        loginForm: {
          username: '',
          password: '',
          // 验证码
          code: '',
          uuid: '',
          rememberMe: false,
        },
        // 验证码图片地址
        codeUrl: '',
        // 是否开启验证码
        captchaEnabled: true,
        // 登录规则验证
        loginRules: {
          username: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入用户名',
            },
          ],
          password: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入密码',
            },
          ],
          code: [
            {
              required: true,
              trigger: 'change',
              message: '请输入验证码',
            },
          ],
          redirect: undefined,
        },
      }
    },
    created() {
      this.getCode()
    },
    watch: {
      $route: {
        handler: function (route) {
          console.log('login.vue-watch=>', route)
          this.redirect = route.query && route.query.redirect
        },
        // 深度监视
        immediate: true,
      },
    },
    methods: {
      // 获取验证码
      getCode() {
        getCodeImg()
          .then((res) => {
            console.log('验证码接口', res)
            this.loginForm.uuid = res.uuid
            this.captchaEnabled =
              res.captchaEnabled === undefined ? false : res.captchaEnabled
            // 是否开启验证码
            if (this.captchaEnabled) {
              //  Data URI scheme处理
              this.codeUrl = 'data:image/gif;base64,' + res.img
            }
          })
          .catch((err) => {
            console.log('request.js=>到login.vue=>err', err)
          })
      },
      // 点击登录
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.$store
              .dispatch('Login', this.loginForm)
              .then((res) => {
                console.log('login.vue-点击登录SUCC', res)
                // 页面跳转
                this.$router.push({ path: this.redirect || '/' })
              })
              // 捕获到users.js中抛出的错误
              .catch((err) => {
                console.log('login.vue-点击登录ERR', err)
                // 错误的话，如果验证码开关打开，要刷新一下验证码
                if (this.captchaEnabled) {
                  this.getCode()
                }
              })
          }
        })
      },
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url('../assets/images/img-first.jpg');
    background-size: cover;
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  /*  .login-form:hover {
        // display: block;
        // 不透明
        opacity: 1;
        // 过度时间
        transition: 2.5s;
      } */

  .login-form {
    // 隐藏
    // display: none;
    // 透明度
    // opacity: 0.1;
    box-sizing: border-box;
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    height: 38px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    // 字体间距
    letter-spacing: 1px;
  }

  // 验证码图片
  .login-code-img {
    height: 38px;
    width: 100%;
  }
</style>