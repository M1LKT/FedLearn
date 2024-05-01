<template>
    <div class="main-container" style="background-size: 100% 100%">
      <el-row style="width: 100vw"
        ><el-col :span="10" :offset="13"
          ><div class="login-main">
            <el-row class="login-title">
              <el-col align="center">
                <img src="@/assets/logo.png" style="height: 80px" />
              </el-col>
            </el-row>
            <el-row class="login-swicth" type="flex">
              <el-col :span="24" align="center">
                <el-radio-group v-model="userType">
                  <el-radio-button label="user">用户注册</el-radio-button>
                  <el-radio-button label="admin">管理员注册</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-row>
            <el-form
              :model="dataForm"
              :rules="dataRule"
              ref="dataForm"
              @keyup.enter.native="dataFormSubmit()"
              status-icon
            >
              <el-form-item prop="phone">
                <el-input
                  v-model="dataForm.phone"
                  placeholder="帐号(手机号码)"
                  prefix-icon="el-icon-user-solid"
                ></el-input>
              </el-form-item>
              <el-form-item prop="userName">
                <el-input
                  v-model="dataForm.userName"
                  placeholder="用户名"
                  prefix-icon="el-icon-user-solid"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="dataForm.password"
                  type="password"
                  placeholder="密码"
                  prefix-icon="el-icon-view"
                ></el-input>
              </el-form-item>
              <el-form-item prop="checkpassword">
                <el-input
                  v-model="dataForm.checkpassword"
                  type="password"
                  placeholder="确认密码"
                  prefix-icon="el-icon-view"
                ></el-input>
              </el-form-item>
              <el-form-item prop="captcha">
              <el-row :gutter="20" type="flex" align="middle">
                <el-col :span="9">
                  <el-input v-model="dataForm.captcha" placeholder="验证码">
                  </el-input>
                </el-col>
                <el-col :span="15" class="login-captcha">
                  <img :src="captchaPath" @click="getCaptcha()" alt="" />
                </el-col>
              </el-row>
            </el-form-item>
              <el-form-item>
                <el-row type="flex">
                  <el-col :span="24" align="center"
                    ><el-button
                      class="login-btn-submit"
                      type="primary"
                      @click="dataFormSubmit()"
                      >注册</el-button
                    ></el-col
                  >
                </el-row>
                <el-row
                  ><el-col align="right">
                    <span class="sign-up-text" @click="$router.push('/Login')">登录账号</span>
                  </el-col></el-row
                >
              </el-form-item>
            </el-form>
          </div></el-col
        ></el-row
      >
    </div>
  </template>
  
  <script>
  import { getUUID } from "@/utils";
  import axios from "axios";
  import VueCookies from "vue-cookies";
  
  export default {
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.dataForm.password) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
      return {
        BaseUrl: "http://192.168.43.34:7000/",
        loginApi: {
          register: "user/register",
          captcha: "common/captcha",
        },
        userType: "user",
        dataForm: {
          userName: "",
          password: "",
          uuid: "",
          checkpassword: "",
          captcha: "",
          phone: "",
        },
        dataRule: {
            userName: [
            { required: true, message: "用户名不能为空", trigger: "blur" },
            ],
            password: [
            { required: true, message: "密码不能为空", trigger: "blur" },
            ],
            checkpassword: [
            {validator: validatePass2, trigger: 'blur'}
            ],
            captcha: [
            { required: true, message: "验证码不能为空", trigger: "blur" },
            ],
            phone: [
            { required: true, message: "手机号码不能为空", trigger: "blur" },
            ],

            
        },
        captchaPath: "",
      };
    },
    created() {
      this.getCaptcha();
    },
    watch: {
      userType: {
        handler(val) {
          this.getCaptcha();
        },
      },
    },
  
    methods: {
      // 提交表单
      dataFormSubmit() {
        let _this = this;
        if (this.userType === "user") {
          this.$refs["dataForm"].validate((valid)=>{
            if(valid){
              let param={
                nickName: this.dataForm.userName,
                password: this.dataForm.password,
                type:0,
                uuid: this.dataForm.uuid,
                captcha: this.dataForm.captcha,
                phone: this.dataForm.phone,
              };
              this.$serverRequest.post(this.loginApi["register"],param).then((res)=>{
                if(res.code === 200){
                  this.$message({
                    message: "注册成功",
                    type: "success",
                  });
                  this.$router.push("/Login");
                }else{
                  this.$message({
                    message: res.msg,
                    type: "error",
                  });
                  this.getCaptcha();
                }
              })
            }
          })
        }else if(this.userType === "admin"){
          this.$refs["dataForm"].validate((valid)=>{
            if(valid){
              let param={
                nickName: this.dataForm.userName,
                password: this.dataForm.password,
                type:1,
                uuid: this.dataForm.uuid,
                captcha: this.dataForm.captcha,
                phone: this.dataForm.phone,
              };
              this.$serverRequest.post(this.loginApi["register"],param).then((res)=>{
                if(res.code === 200){
                  this.$message({
                    message: "注册成功",
                    type: "success",
                  });
                  this.$router.push("/Login");
                }else{
                  this.$message({
                    message: res.msg,
                    type: "error",
                  });
                  this.getCaptcha();
                }
              })
            }
          })
        }
      },
      // 获取验证码
      getCaptcha(){
        this.dataForm.uuid = getUUID();
        this.$serverRequest.get(
          this.loginApi["captcha"],
          {
            params:{
              uuid:this.dataForm.uuid
            },
            responseType: "blob"
          }
        ).then((res) => {
          if (res.status === 200) {
            let blob = new Blob([res.data], { type: "image/jpeg" });
            this.captchaPath = window.URL.createObjectURL(blob);
          }
        })
      }
    },
  };
  </script>
  
  <style lang="scss" scope>
  .main-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("assets/login_cover.png");
    .login-card {
      height: 500px;
      width: 500px;
      background-color: rgba(255, 255, 255, 0.8);
    }
    .login-main {
      width: 350px;
      margin: auto;
    }
    .login-title {
      height: 110px;
      padding: 10px;
    }
    .login-swicth {
      margin-bottom: 20px;
    }
    .login-btn-submit {
      margin-top: 20px;
      width: 100%;
      font-size: 20px;
    }
    .bg {
      animation: slide 3s ease-in-out infinite alternate;
      background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
      bottom: 0;
      left: -50%;
      opacity: 0.5;
      position: fixed;
      right: -50%;
      top: 0;
      z-index: -1;
    }
  
    .bg2 {
      animation-direction: alternate-reverse;
      animation-duration: 4s;
    }
  
    .bg3 {
      animation-duration: 5s;
    }
  
    .content {
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 0.25em;
      box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);
      box-sizing: border-box;
      left: 50%;
      padding: 10vmin;
      position: fixed;
      text-align: center;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  
    h1 {
      font-family: monospace;
    }
  
    @keyframes slide {
      0% {
        transform: translateX(-25%);
      }
      100% {
        transform: translateX(25%);
      }
    }
  }
  
  .sign-up-text {
    color: #999;
    cursor: pointer;
  }
  .sign-up-text:hover {
    color: #333;
  }
  </style>
  