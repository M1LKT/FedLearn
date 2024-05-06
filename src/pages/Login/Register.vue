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
        defaultAvatar: 
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFwBBAQEBAQEBAQEBAYGBQYGCAcHBwcIDAkJCQkJDBMMDgwMDgwTERQQDxAUER4XFRUXHiIdGx0iKiUlKjQyNEREXP/CABEIAKAA8gMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAADBAUGAgABB//aAAgBAQAAAADbsmSfE+9nrWXDS1KIJVJdPcqylHkel4DWpy2foWHYWgmU3kKEEr61hNdXVpSGA2MNW4maXPcd/DxrbPJkHluNCRP1TJbdCA8ShlQH9XzJxEVhW7DB59uHTW4Tq+nVKqi3qchAlbiLHpTfG+VPV2YnqDEHvRGTpTZWqyoFIHVX7ZGDns3Jmo12c4F+etTVru8x/IlWzO3QekGN9mvttIN34ibkzyFuafX5482CWlN7+n0WbphYQfpQ2AHSoenmpGljFSpY9h6ZHpNV0ELYBQbGkWn83Q8TZF6NTvZ3lsIfqSbKO1z3mvSvbvK8NFPVhKRNhPkH6IYs9RxF+dqUhe98pGzt8mdNpPZafbmpbGdwq9JMOrJ0dCMkQzgr+QaRTts08cf5czdE78Grm1ktmnWfHmdOki2q09F7OhXmyKTmV0bko9ETOOPxpa6cCzG5sUo7yCzkvvwE7i4K8pqvmRrWJvWpqZg80LT0d6zPnM8MZLUVO5v2fboZpFaiv+goFnyF75psqr5n4jRiga0mVr8KWwZz5wdtaw/Icm3ocrXANWyr8eVdzGkBQuZ89mPFa7Chqn4gqKVFyjC7mmmOMnz55t9zOFq9Lx6/0dLhO9LAYlKDX5gjZdHAP3ZnvyOr0vJa0AtTAe7Vt5+p2EqtOAytHBel/FqJ1/kii7Ka/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQH/9oACAECEAAAAPUFSYdAW5OnWfn688ZEK457J0idiURQdJK26JJlaVEbFUHUrqjHIYVcISz05qLKxTVE8zzSdmQORaamdWWFXSsKF+ZwLCa0XS1nJ5qxujzByay2ULqzb//EABkBAQEBAQEBAAAAAAAAAAAAAAIDAQAEB//aAAgBAxAAAAD57re5u8fT51DPR5MnanJDrz3ztw47RLubnKDqdxig7nq8+mh448tIp8cwUG0madLa9hVOkUhmyb5gtSDl6Jk+k6payHlsiez0TtJDF2U2Ki9eTof/xAAwEAADAQACAgICAwABAgQHAAACAwQBBRIREwAUISIGFSMyJDEzNEFCFiVRUlNhYv/aAAgBAQABEgDk+ZTtRgB6aey93d5SGlqJcFG5gEfizukB93NtKLXiCcm8rJz1MrwNPoyibicTC+n6gjmEWAvmFFJxnG+aRQ3ah3FHxSMY439kO0B9a0MSjjUMpvo6rHy7V2xtav0G0lLEjM/tParH8ZFeLj9e9yrvVF9TWta1nszfh7zfHTqe4nCujr6/kwX3VLTSNhgBDm4i9bjVGmWhKltce/LGe+1zIw0xQoVgZVzTb6DceeUC8w8PWw7JZzJWmOYtdg8hvt7qV0/GAzJqw+3yOOPNEtBNLJZmvZxklpdEd1/OJviwiSPGzrd6h9i3UzY//d+57CLVpDkZmudqXWO7iP4k5BBnmqSYOYbPJ13KXOHrme4+3ncJHHP4n0KUz7Gf9RjZ5lW9PqUuTuqFh/PqpXMTmcjolQZfvlpBS9+G5s5iXp+cRy7mcm028a4kVyj0+CACIj/XTfjMz4zJkKan+v3GGfk282hGDJ2WSSYH7/OO5RaXycd2c0WH5zZleyo2SQaeYf8AtKuXV8W9zDUKqDH1hy3F+WqOqVuHrfX7a8vl45vQ0P4zqwzZMzjV51mjoto0OiDQSZFSpQthSK7YOctyn2Y3wA52Zj+7GS5HoLcqsAPS9hm6WJSXXsq3JwJa+7+iq4my2ECGE7NbNamOkf8A5gWDk7D8ugBMEcyaTKrsWvX9GxTEM+8nW9SSCuPquJ00qLlG3exmuqW1Voau31Fr2G75VytdXKO3oHtxQgDOIgvZ3DUCnQaubyvjIElSnbFA4xEPJvAGU8e1LnsYQ5rKk009uV/qwSmR7Hbswt0d1rFYPRm9G0yS/T8kj/U/ZuX8kAig19OjALTMKlBjsdC8xAST4xk65mjNnXdAjzIXoS9YNfSnVgS2fNsXjTesGu9VRBjO3PF+yeJd69/IfKeV92MCnqlumsF43j/cXRzlNVpke5nGRuoGPjPDRP8AGsFuwlVidYD8L06atkXxqftWUZ/7Pk9jttWER7QwKhAPlll6cZ2vyep5dGbLPModrn9v3W/+JNtNPIchMmlWRN9DMPS4sAfyHgAliX6em8rGCzBG4X+ZeNyDjWvFPiRPbRLp8ji3K0oTMo58GjTPEj9rvLxKxXP27nx7gxQC2A9/4s9n8idLrJAFIgJtLAyU87glnJqR0V/w45mE9iuPBRa/99y3hOVulqat4K6dtAJ9uQ8pq+Y8JU8TMOMB6NuOFkwCav8AzKW110cg2qluK30ggq1V7x3KrUZ6jf8AtgeLVdlGAf4CeLKGNW5q0IItf6+4Sc4yNT+PjVOnr59nrvxrxZSQawRZutkixym6h3rARez5xyOJWJH9VQ7vbdPkeTSK9A71pWAjufPa4P1G5HXPxnwI5MHWbyHtX3E2MpQDAmViMfGYDofMW2TEqmzUL0yzFj9Ob2vcejVol617v1MSszNqsEWaFSce/wCxP/kG0F5+a1q0L+6/K0e0dW1vKK4dOPWVrONBrGLNVlPIPQTFoG1ih0AbyQVDYjUzMVQKfOYolAr39VAtX+e+tHKwp+mtE8ixZu6iC9QcZiwzutTuk+Nqhx6UaDe/YHsKyzUTJ1IinTHzvJ8hSlG+zepLNbtS9cTfrCmnB8dsf840ONWfuFFDCPt+WShd9pOcY7MNXgMjl5SRy3/U1C3tEPNR8rVW6Fe+NYJY5fHSBh2mnZSJYD3RWTsUSzMCxrU549SkFSljEgU5kAaVwNYtbHNzdHytyWJYOjTyojudd8c1/TzbNsdxuLFF7MlRxboa2slUQ/8Av1KeGbL5WnBcYFmBk0LZJaaXt32foeLivSsEhOkhAcHCpxtqyBC2Jd+2rOnXIxJ7D0wAXjsmQfH1k9rhLwPfAK932XJZION6fKzvpqlDHKpdpMMWAq99yIKWkGIP85y0j+OYn6qPa6j8rHj3Wgx7pEOF4dffifuBygOcb0z6BBuUTcXLahFyGNtsL8ZyMXDrlbScmCtc6zzDaFOf9KsewCzwrYVUYjBNIO/XfZHxkHF8VVyX7/eULM+Md71py7fQn9d9eOt5TlcVUNOesRxeJZEj7OoxuFn+Pj3pQCdPaezO3+Wv4pyQQ8B+2wvGK9p5/WolQkl6ZBvzI3N1YmKNLDEw05bdx62UmhwevfZyTAmTIbI2toyoXeyanP7xIpWlDDnHD13FrRzWcdlTur5yxO5ScAumWBYvTLAy26uuYEgvw/Q96fn2n+0pmzKwjFgatPBUzUGZZmeG+cNPH/bU0/e8/JDi2jydXUf+kP8A7fLmsOooprSCzR9h5M9upjAzSPrIs1fFBUVSgpCjBaAu35VxqNSUuUvf6x/cx4/fMZ7ypD9cBP469ravq6mjZcaWhvOTcsEUwvUeIyciDeVQxJsqieRYwVr98/G5Yvtj3pZiPzimyr5CTGVCDfaQJ+VFbdgYsNJOkK9CpFmZGcs2glQs3AztCppuV7cagQ+FAaYrL25unqC3Ph1PrRxNLiWSmiL8+aIZy7EcYwCeX7m662jcCZdkuOwR12PhTTLLyJXljDD/AExnDcJCU2qeqcVtSe5xvNzLEHQVDvcv0+Qco7kHfYWzSzSIF6xZkqzXxk7yH4PlMV4jjpcOmbx6a+nzQjdS0SAlrxvLKA+YA8BHpxRZ82LkcBFIf5Ys+jFczLv1gb4InYTA6Ku86mZate0w9nytyXF7k8U1rT/Jm5xyu2SuOxsVKlnP8JvG9i6WKAfO+BCQdYytnGOBGtZ5sXys2oFNKXbqCLJvibwZSblmbamNFOfH+k8y6lNmSHOvNXVXS/6mZM8GN7YGwL+tdI9y25Jok7M5upS7uNBAUFGz2M2dVwcotgSuGeSlXcFJmPKwUSxwevjdoVMyrh0+mcRyhm4x9jGTv1ZT406BXgUyGgpirrHWMImbnIINe6vA8qMR9mPylEpsrqw1/r61QIc3+t+qxwVmJHpyyGdrlIcOZhFm0cxBkzQBsw9fV3zbVez+P8e56gnWEq93b5eKd63KBwunR/ozg7o5MSmDJFEw+/sZRYmUHIPfsATPONp90p0vR3JivPpure2KPjspih0zWWLm/QrfSsqGTqLw7+QV3LrmpkjJ25+GKbe7GcadT+ymT/8AU5SolifTkTzwZezeXXHJyGI8zkXQTWzhoJiimQ+AvbOP7s5BK7zUnj4+gr7OBn0pN/J8Rvb/ANfhtvoQfG0qXKib2Zpnx++xzmm3fJEEvzjpuKia3FkorNR4xvLWnyGCtNkuToAgPbpUBOAPvUM5yl6/nE8WZcpxg2ub9Sj/AMGXn4+H47k+OPjFefVQtfqcmaiq3+t9TQ1Hp1syFffAmVikei9M+Tbk1YEmlvqnEdP4ul5UzPyBi1aTqfhBU8E411A56BDyYBcfpQogiMBYzWtmVUPGw8q490ve75xwcWhUCGpuxFBlmMyp9XIG2WNO5hf57csqXdqXKdjFLHtPxkqOFMmTI+yucsE95PgIh7yhKzFglfq4ulrIyalKEr9vk2cdzpcnS5XF4WF2LAasqjXSaxkHOhGxzYWs4/jXZYlxsJZ6zjPr18naPI1geNjHNSbVdgRMCU7OfTvW2JkRrSRfdoUOepdMq4yd6HPrkMtqzkvrO0wo4o1jgka2xVxnRf8AUlen9FvWAV2wihIY3wA+PPqzfzvYd/8AtL79903G4xfhf/BVFJwcpZKx4PLDHNPat5B2xSxsxHcdcb28TKwZdUlxdRxmFuV8i6nkIw7HKWSrTIZ8pLvSUlYj2Ywwpmv1Kywn77DDeNTNjArpOj/UfJhFdx9NpxTNTqkAJ/OZ1FS0GxKiygvB/FQlhYTMxpegdYr6HFLfHignFWiXk6x4weP+tEhRdGlmsRxYV8efJan9FvYxzkO/tFwIK8pQUDMDBJcTypZYo2HlCzbRyTncpNrInfXAxwy5p/IOljCZMmCj1n7v48QtkR7KXTy6JOcr+Pp45q6X8ihrpV2r9aUn5Nn0Y5plrJnvc27MBU5PJ6zBmHrHv5QYplua4Q66xcsIBzTlq9MywQX4rXxLdvSw3CWtY7cnmqkvw31aWb2+cg7lfWVKsmxRmWfMsebZM5CNLmrJgO+T1Px7lEvX4BCkMKaFYucTezWqEMxXCA5S3OSZMYGGZchAUwKs2hrrd7L8Ox6XJTCnSpYY7TvGSqegqe69eo2buX5cgvsudMOqR0WAJfp5Y1PgHxsPM5XmaWZGC5t8LAVm6YGXzo3GCJHQQONDZtjP2d1KV7EIbDSCLuRxlLmizqGZyE0rOU4hUsBivVDgY1e1UWTJ5LAVrVrzNXGmkEo2wuimHp8pUgpUh0cI68d6pSir2FvYRw/Pwjji43iK8QZs32HuyM/sMTSg506gGD4eaL6zieeEWEk5dwGqkdxUuJ1wdQNvCyZN6P8Aacm41xr+cbyI8mjkoHuf9VdC9pVxzPs3OBD0Tr7uHflEkA+x+P8As+SHcB/Pp2JCdbGLlksw+IjmHkkNr3cUwfYeclKvkrRsYDegUCCwqqV9t0dbCeww7pVRyho4hyV8Q89B5IW2ZvJcj2yWSdJNUzAYibluHe+SuvBYvqe0QQF7KRu5c/Q8C/y2At/PYPnKbNlCjQ+vSR/z+Ub/AFpAQKo12iOb8kNx1vKr/wArgE4/nMVvppi8RFPJjemZEi6qqNZVFuMnqNeqgh1kcWyAJdy9h81tK8mBaCSSHj8XTJDldC5ujM+xoZG0Nula+rr3R+dmZtfPbTfmvlmUtebcuP1YEsYoeygj1tNnsozJjQp6pyx228h6CSe1G0qQXndV6fp3IaDfar1hnydiAjQtU2mswZjF417padf60YwXB4pXIynjbKs7Dql6zObDivdilsJDXqSw8OG3ZUfWloakGs3c4T8Mpu+rHO9pCbEwGbVV1O5Qk4sfOjcXG5x4tllKio3kAA++Wbh3RpBIFvr1jIlcltfqNxMYtTNWp/mJaRKzT1bxzc5OSnOclCawgJ86QM3L9xXcf/Y2ej6o918Je+WpB7bgisxXp3u+/cy2xas1QEC1cfyXUipcPfdL178+ny5fseL7b+d+Cm1ciAqZJ4Uf+Z8tyDm8ghzLEO9BD4N7kuevrF1UaHIzdmVSZ1P7rmX1zouY2clCnj+O0sZ7sZq5XO+m4xwM0/03kXWKBFftJHsq8eeUyFUQp2vBOk2YauKTtletbLp/THxibIGJxnJJjkF1D+/R9PN8gzEyoxHHH+PPNIpl5GKZjVYrCWHTnuMchM9ldhs3PWa1xxRZxdhyj5w3L1G8gtSeO47UwsoYalglMsM27V996lb18GD5uPVTxIg/xp1J3N5eJg8rq0XfrqhMzxPG7A36IC6tFRavOLpeyrkglmcpNPZneFfjkLC2s/OqXurKLdkZzJTdsULAXokDuF2mr3DKtBfXTSyZPLwZx/gSY1iy+Mr9sCwGXzptIzM9sXfx7cW7ziGTYd7VbY3UzEHvUw2OkyTa7yaSgTPOmlC4mD9BLlAgWYDAxWe01qds2ezBYfq6sP8AZ3KcuLd/JiqnhkcWBqBWWA0v9/5I6SfhK8498znseOae4nSmP3Ka2gfDvl32XIUgHYEizEw+E6l7FyzrVqDaSdopdyUCUQ3GBDhEvGcs72TJ1z5/GD5Xi/dbtlHFzaC89mbv3GyqCNQep5j69P8Akm6rjOOgkCkR38OZy9R/ajRpqCZfpXquYjq3meHW9+7pmX+n8gBMEVMrSSLQ+ua/gWBnEqRaB++jscy+Sgm4+T7jQcVjQFZ5xs6lcZbmZOY6r/PXo+zvDZppB05D4zlYKU8xn+6hWES3ZvGOqcZS+3czK+5/ELyDleQNsdLRjaxmDxOVc2931OP851+VxXrlZ7nwToDqvcTxNXJJarLKWjn/ADDYQSnju4Ixa2j7HPY2GE5mY7x2I1/GZLsPECgPGH+PWc32hjsrcWqXH4zL34zleHNsaNj2d0Pjjmo2d/mwQ3GsX0n5huAmlAFQVHVGh/b8v/8AWYf/AOeWdr1vMQe1W0Fm6SeQsordkKMmASSfyhYC1Juz3Coy6L5Jp3x5uCkfL/Zua5ii2RLXHQB+53xeTGtDikxqlvZ0bdkxSoeggE8Q4E7x7jxckeJdQ1jydq7hcfJcUH6A1DS3vyCqZOz6ORzVTh534MJ380sLDd/mKzDNGBP8nOaZx76yLv8AP55TJqAauTwTBXifmOV/XSHrT2pSB3fnLVKSvQp5H7GP6m75/HSTsTkDKE6NNmro5eWBc/FMN/t9aPPihFTeWM4YMJQK8nnDrvY56bnwRCp69xaUv/uuVR3ocl4l3z+Pp5BHKckk0G5Og4zCr7gMfIBRTh1I8+cLrFG/j/8A4iJQ6JZuwyxpgfG2nHtMvTpz6zleMcPjvk5u3vae1cAtkyiwll+WMe66VBWHd65J/IfOszV8exuYiVF6c88q6RVNsnC3InnNomtioiCean7LhXhEnuQeCLPrQZ+d/CeR5jkePNIArdaZaxz27Jxzw9O5mD6z+J/rrqWLpAFaBD0mahSpnoQBp0+3uBPEZxiabffpEaO613exARhVZg4ForXlW/WmBWVqoLt7A3+PcnyFCgcuZ71GZYZgh7Nv592IceGJ6xtUHIOfa7xprb3X84SqapDqrmBhmIrD5Qt32/vx5KGMvHEZ/LFf4zA2lpkAitzZEwRBMeB3HCLDZz6DpS180zZ1LQXn5xWzBxYbu4LmiW67kOSaqnj07ij9fsk6Icr74uutWlf1fGANPG/ZFqzzO7RM9qxH9xmKpOhJqLMPhR+zc5Jo3MM3Z5vVLENkKFO2gzL17/H1cdlTFNTrWH696KyMY7eNUnc33l4ZxfIUs/teNICVKFReW13QM41MeftPlXTFcXfGtFKHBS5qhHQ1riphLjWpPvvVgJ80sq3kLowd3nX0npzk70glM2KlX6zMJ+FlJCS2FvnVjvyVWeg/1dutItZsfDyXICn3i4QNm6fI5NNyJ6npiEf5yLrp1XJ8lCwj0mAJ5sh8bvhdNmklSHL3UogHj+gfWEl1DuNr0OVmp1s+D62ikAlvp+mmeXN1yi8M0VWsCmkqRFedvKf65pwOVU6bVmPnPnCyu2blMpxHTDdmL5XjDkkgcLiOjT8HvNyLxPpWlXRRr9gQypTy7gaB47DJgMsrXsQB0YpzRHdZxAHUEyHB53S/AcjxhpZZgImVL7RzWfx5MCkcnawO+TklYGqoFR2Nevylb1uXt/LWW84tKY0gLy8Lzg/7GZ/rCmZNPtYHd3DzNc8220t3B6Mz+NJDH0rVMOuNQrzWVn9psmmpRGAs0OPeILtAUjpG9Zr3juHorZiddVIM7176/qvXTatF9U6g9gfEe1v6VWSoX08AoaxCTEfQUocMT1rbjTx/haEq8gvPK1cl6w6JsMeueCjmTPvIbbYWYfY0qnapU7lIm5Brz7Hm4lw7T3fhPMCD2LYBg8MD2lgeUhBx2utgtYkG0Lalnn+Su4RcdcXmNenQkwbEviujHT8W5wK9fsP6N1Q2TcfJQJreIbpQGW+hWTNb/i7GWNoORoZhq8H5DIGgmZ0G7uuMBxecko5uK08WemY+O9o/2R2OFhCyMx3D4DaHJ73yq5H2xjuHyb1U6xaGniewhvyJh/cZMtjB+uQ5utyNyn9ZiHWD7NNPIb7Lc1X/AErRJhfJ+Usdx31o48aoA878N8noTcUYrrWXnvw7iVa4leSbg+vT5Db/AMuSjAL7ArAFKsUyE5XgDmitJ5i5l8xAsh0KM9yzNKip3lOOSe+3BWa9/q/rF+SnbVnu/fFura2mLhEbiwL8SIj9S+8y5mUCWnQEcp8dYvb2N0zLz89TmysflXdxyj5aLb+o/m7/ALZ8o39m0tjencR5zONYbx3dQWeRLHM5GwGdJQPMSBEafky/t6oteKJ1k7XtlShmJQs/sifbQ+ckhq9ENSBEhS2IxirFTrarp7aRFbD/AI9L9PkXwMJXRRDujMkM5fmdb5HOg6jVvmxM6rmrDV0CnAS0d5NIhCyhlD2az5yTTbw18Da/Ul/X8oWoeDr5Mx0zWpgBkL6hQxcs2ZX+uMazikrqWFh66o6h1zf4qhY8jyDt64OEW5vJ6kFWGlXYGiWb8hIc4Q+KSiemikfdnzi+POaU/tPwlZ1z1MyOWj3A7ce8fDtKmpc6atd2Dt4A+U5dKFje5yQcb0nvyW3VmxSfsdzeXc+YOnj+RipXTvt15bm8Hc7j+a5VVLtp00Fp5yL7b26tMQ6rDZvmVnLrJiFJjyrFM6Zxrbd8WcjZEspm+NUcpNtc4qUiKjEyolSpPHZgC3W/6LM9jb/+J2//ALGZjZgdS9wvMB3xyHrCqGNKiazt4PQ4xjStynT+woixBcYgGCcp0ngkRHp0eiEnJ+q0sM+mbRw+etdYrULcMt3NdNu0py/dSoC3F8dT0rvZXM7VGLnm/wBWNsjzkH+MYLAObjPc7+QPfMlQ5H1850bvLclQVbc3DXh/OZlxaaYzfp/8fK5un9IYJm3K1ezHJ461EuB7nbjsNYek7CbyYGiPZ0aZGZyJnaA0a5rBoEvPzmbUSwU8WAnrJv0P5wa+Phip+16nujJLPHG59YG1S8aTkqt8M16Sryzwc0bp+rNOSGKnh2WOfrUyF0NcSgW3PCE4L+q0h/G27svLOpkzcULvLP5DXbexOrwgeoPclWvXbz9j7kiMv1xDQZNBLxtgKW0aNH8LncDaUVL5Al+fX/rOhy+Vpuc/MeaizVs5aJjUMXFiTncPsc3kUuP2jSIlpEDs8J/9qKev/p8VJLi0JF793RIN1zcVEk2WPM8IgYxKTc5eoIzSfr8mZeus4c66KhXnS1ULqvuBcWaqr0h8VLxo8WRanGtwmHrYdSGn+m4LA8H8vOZ1sjZJeq9EmbtaZlNQeeX56iDc4mnj4eRp9frzWGOYAPcwvMSia/fxrYz2kSe1rda/9PKJY9mv+z40QaPyGQc5KpzI9S6YvL85Qlbc6VWb66QGb2zP+mGx+nzRX2X6eSzWEnafOr0hSZyU+omWugx+9BTq+Mvq/dKkCwug7hkl0hcgjXqxYT+dDj2ObNYFOq8z2pt8cY5wpcGgdT1PHQYq52W08aMm5CwypPa9ZttSGKbm6LN8r2X+xfY7cxWWT4WMRVZyzo2145kwk7XcX1K7o2JRKmMl5nJZB/Y0myJU/gvO4jlpnRbFGmfroiG/EtSlLvUOIzXie0fcYf74Z+N/Pz//xAA8EAABAgUCBAQFAgYBAwUBAAACARIAAxEiMiFCEzFRUkFhYnEEI4GRoXKCM7HB0eHwFFOy8SRDY5LC0v/aAAgBAQATPwCUrhDu4guLomMAVAMTq0Rc1pd3akJNCwm4iO5vXlEszAkEhaTSJt0TfiZpkdzduXvWJYmNrkG5xlbrc2OI2QZAKtKWeJF5FrCLwmPuEiDb4tbpCiZiptyltLEe4omIQgu0mjl5QrviKluJjWkQ9K0hWteYq7dcI/aAZJJBPJ30RPeJhCxRdiOXgtPOERwKRBd+6iojo4YteFRJxCvmkGgiCsFok51par4RQ5pOcjiuIYBOEJym2lUbiItV526VhTIAXiirGkTR5rE35u5znDaXPrEr4YdL/wBzWwa2zAa5wi4Rb4W1jhuNRyIdwly9oArsm3NIiuVUgHNSbuy7l26uhJghbuEWj1VboOaJEpATRKJIEZqPw+4Ra1pL0iYnCLihaQ2u6InWHlCygHbuHa3lXl1hRIiNn/TLH6FpCKIli5u325wc4yNR127S84lCOpuxFzre6lIlNmylutFto8tvOAQTICd2Fh+Yr82WO45bitb05VhXWM3TBrcWu3TxVIVTsfQrR3a1TpHxBtqLVaUsdxeHSPiJl3xDCR5F2yxp0g7WC0LvSOqJ1hHGE/kIiIttctE8oa8QICv4t3XH7wnwwgLW8S7u5JEuSKsIyvErstOkNFrMScW0daNiWpfMYK4i7Km2Aspy7vp9KxLmE5S0IrnWuqlsJLuMd2X0QSiasrtRw2/yhHNUQ2DaPjrCEI0ZcLm3Z9aQhPKz9P26RMMgudbbLLHWAkC5zlbu60gZTbW3EWtw184lCTsbnDc2GysfCElu4Q/uUmj5wk0QBuuDbRma9KRJMgDFzCuyGiXQc4mhtY51w1RF6xKIz/477XdPmL9oK0kIBdcBEQtGmMNFJCi+1wbPTpEsaioOTErR821SEQXTRMktt2x8MLSQmbe726wcwjYOVwuz56DC3cN9SxK0i9W2Da3FC3XCQ62+esS7mWNEiLb1b7KsLMF5vyJu7WqOgJ9RWxRHXcXO1I4ghKTnuG53msBLEiS5HCRu3c4VXEpNta3QeUGtxk5tzREm6ZJEr4WaZIIj/vOJaABGOt/zCIhcv1pSJ3xIlbNFBxbaJR/F4b91zboMSIT4XeIxLZKJPSIkt31iSUoXsqOQj0RXQc4iK8sSafXWOGJj6RluJvhT3hJYkTpRIRWuLwpD/BP3QhiU+WPaO4uWW2EMiFA1uaJNEvTHw0toz5QVISEyxPu0p1hVdce7FvOJiMNJZijcsh1VG9YSZcgh3CNpc4DIyfg7J3kUS5V8iYZN6W84awZo5CWTXQj3g0FcJD3VTb4wbGyw9TiyrVG/mAtM7c/3a2wCkFHgoucRO8VWFVwy32tdvIqfWEl3qIVcLrhbys21WElOsMkud26LikTJYnQj2iJFl4Qkpwr6fv8A3iZPMbjtGyWP+IoIkBSicIiRHuTKukB8USSjZc0eGjXFuTosS5RGSXLi5LS1SFmkIoIGjRIdw6dIl2UAyc95Jc1IBxCpBbjtdDCem4bpn86Rx2iu4SEbRhTfSW3aTsqLWEliZKQEhO/cu2GgAIM20htGFJKqg6VhUFp2uI5hFbd0r4pCoLUIxytxLRFbCOMgL/qj+qlCHbExRlDL9F2XK6EcBgytvaRWWjB2Ejx7hTy8KxMITH4gW3CR4lp9Y+InCkiUwkEQmbiHtOlR8YlqL/hDY5je2tXfjSFmuFgXOIRKElkYyzDd6nVxp9IRwULHIciqqYxKQjMyDINrea+Q9Ylk4phazCb+ncvXlSFQlJH0uL6p7lEpQEQEKlddiW6FRou1IicK/wDnWElkAo/9PnEx4ll2/VFupEyYJE5ys7m80dAyzI0Pdw3CLYRgiZaZOUhbr5wcz5SjKG5zvJYlKJiYiW3TMq9FhSvkC5XAW3wRvksFwnL6hyL8QkoRw3OIRv5JBzOXK7dEqa1gttLIf3DSJazSBrbiISK12qcov/8A4iaIIQSmYFba6it5dVjhvo8bStuKZz9q9YCYwELc5w+ziGEQGo/1F20X2TnCzHEpOUhuG4G1t0hJYma2XOFv56a6QaDNEO5vDy02pHxCEBs0cEzh2k5Kt7uUTJ1yiGX7vEYPhHSUAuE3lcLvprACQ15tyG3SjYA3MJzRL793hWHCImOROuJsuq7coMhQJgcJRa3tGlG/SDKgKJjaMxu3k3tpCymCggC2/Mu35a684kyyaDwtAnCPgnvE0xEVfk0BuiYoq8tSImEW7W4oNkqVL4RK31eUSZBziP0vJoiNInzWkH/1+vjFhHio9SIYO4VeLcXXS9aQqtIJjshCW5zfOJaCBIRlaZORxDRfFVXWEAiJ24bSy0ti2UUwQHEnC5tFy8khFBnC0uIcvt4pE1B2TXMIR8tXa6wrqinTlBoHFdo9wlkI0RsSgMP+RzaQl7LEtGkjOwSIfFLR20rE5RKpEKkJETt1bW6RLHggcsK3W2+COEsYWWZEZmGTvfWFAhMLkeIja5yLj5LrAtIlE9xOx8LFSDcVZZ0u23UBEGOGTkYKk63HXTnHCoSF3ZYwbxrg0Wiu2lsKrgQu6Z2818YRB4viLiHb/tINGi06iRTC2tRLaYw47yMVddu5rCoRljudurp4ws1pqRji1uWscQReTWiPy2+NFivFNedxDLG77pBzJXwgGOttCccKpFVg43C7rrtpHwwl8RPBgq0phcudLR1iZKIqE5Jl17RL7wEwTYwLritEtcYMyIW7RL9MPASmCeJu2t1+ixLmvpLxMC7eaYwk4wBbrrRL68oOWZ/Kclw7R5QkoaVhRfcFHDl/SDXhEgud8wRxHxEfLWG1NSAVtI5hWjorvtDhHil2iNrRGAY5bkFu75WnvpWJky9ZfuRf6kLNcYE1SsQic0VTFPFYmCHyiMbmu86W+HWFmk5RArmiP+jXSElkYt2k4u6JpjKJoCjSaJeSeFOkAFssWpl9EVC5ecTvmkZHRznEIuGiK2kGYsmDKFBHHERqil+IQSXik20R9PO6PiSIJqCBKP7edBGJT5Qo8XCI4uHRHcoNC+awHCQ9paeES5XFJGC4stusTkFqy8RGpKLW66l5pCKJA0KXSyER/KrFpz1YW5zrtUiZLM2THLkRE1o9BSsSkJAmGFpNAcusTpgka3KJEQy91aQEoiJSarnOFt0HJuWXN/8ACWwaiBIB1liJNddyxWHCVSMOGQi7zWDMSqM0kFg9nqHmPhHF5eXOAlEInMehEJNyEeZLBqTgIxR1pe/sMTVYCidRErttVW3dziVJFh82tJrSbS5INAGUHCrcQtdbWscMy4g7iHFojonqrBo4maYkTmjotxZeEThIhDc6W20oOWwf0jj/AFSEO6a8HNG3yXGAT02EPp/pE1xC0Btdt8V6xLluIxx2t8YOaw0ZaMgQ2j/VYlIIEYtSY0v/ABEyU+omLXW7dNv8omIMoLwS4r7v80g5pjV4KJAzJutbolIMoFZUREi3FytHKER0hR0K8iaJfVaRMKxR2sGg3e0TFGVw5oE4XCSERuVP5awE0tNxOMnCLvJIlGQjstI9wiyJZCJOMgIWju8boUxIZY6k0vVCy7jYSYj70X8pAzNki0hFSc7XpoMAooMuUdwh6pkXgIFNC1u21deXKOLI1Ikqq5QZsEyc1penu59YtvY94W7RrX8RNGxxk1zdpUokI5qy3LtrmNUSF4rFFyXEO5y5f2hZjq2rbtIueUJLcSFoNp/9vh4QlwP3CTrnapqOUXFUWI0bdun5WEIpNRAkxudcq3LEqdxSQQFHA4rhzq6JaiJGUomucWRc3RxxMjIKE5jrhKJcqaYmTbbihFESAmq1w5N/MTZo6PF1rnO5wkwjFBaksSuLKp47VhUYR25CW0oMSMkICuIXbqVaVETyiUgjU5VziLaNKeMTZnFJLQFhFiRadFiVJIAcWIOJHNprrEs+KQC5pERWhEpRGgmaDdb5opCNOaVhUumFiQ/iEC2Zzu9PP2iYoiDJspoXXEI9xc4mIRkBOubtu9oCVxheFe4riFFuiZLF3yqEAj/fnHGOJjjKZ3NIhyFIVojLluUiu+kS5glw33DxBxdSATbreTmuKqXFBFwglNqTJbcuaZRKVxzZhlldlFB0eQlaOwqJ9omS33dzvV1GDNohMC54jkXt0hEI6i7ERluEtNPzBkIkggXuRNHzhEKdTim4ju3a06awksRM5jmkP7edtPGkfEzCajR2i7+UKjhN49zRb7VhFvWXoNv1pHw7WOc30/uj4e6swHuBo2t5OiZMGVKMgFxNB2RJo0liZLEhkTANRxddySJUpryxuJu76xNMhBScpFta2iVJ3SJkoTNSdk2X73DRInIIEoNcDhytVIA+RBc0WuL9S0j4a2kp6kTbcaQjFF4WiItETHSkKgsWZqJeRDqixxeCKbXt7Ylq4TmNaAeka1/rA/DA2vl5RMmMFSd/+dYBxs9RC1rawqiJz5jncUjJpNLVtetYl/wkJ23u/rSJs1pLLbiI+ywkwzFRDaJYuhREqNJMjIrh7orao7haOJa+UKAkRhK7SIulYmTSIkELREWjbzpHFIhUjJBNrl/lp0iTKtXk3ux1X3jnw/S+1/vSJYurLbcRKV3VG8ypWCmOJCsFxN+9awpuIH02kVvLzdE20FIAWYLbelbeUIBSqSzqJNLIXa2wbviBZuInFjzSFaJIL1LEe6qqOsSZRPxO51xNLypBuOgPW5xWuJaRJEXKRlc4hS708oMqkgzakIu7a6+8XNaYKN31RYmA4luQj/V09UTEMKlk0RLItMuUTWHSbqLRFt0BLeMyaBCV3boqL9VjkTpROEmkOPnASrUJeaJryhZZkSiE3a4YVR4sznYICNo+HtVYoJignaQSfV3NhAERNhJdltpT/EKpDNUj+uNK+cG1qy2Ox7o4wnN4gYD/ADTrAFwazGpiRC7wW6NplNHa0uiQkoXtC4huyLwtgwaMiW5SBvcUZsEhG21ou8ChJbqiZoLricOtYQi2EhGLRS0tfLRUioyhc1LZYuLHnbBS3mjxW4fro6lqVhSIase24vZUhEMyAXKIi0rS1TdFZQGYhiVaeaL0hFfWXNpMISuaOu6DmkFBAlu/P3hHGKkJK1t13ikfDyhAAt3E4WiXTnH8WbZQWuK0YRGi8MRJu4qonvFRec06EWWIlVVdD7TEKi0t3R0L/wC5NC4C/VovjCTiEQFuRNipkSMLh3Fj5tSOFy8sYQGhedrXYjXLrSJhkYoR0dwxEci61iVaDwuuIdvdr4aRdNOaQC24bWgOiD4Qp/wxduKXlqqZLdWiRNIkL4gcTAXOa6i2wjBBQMUa13atEKAHkTcX+1YNRCar6Yi3p1i2aUuXraPq/nExGmgAKC523mvkMTPiSMmmOQt80+sN5kBJcJf5gJjWEeF7Wt8q06x8MPFILtx4sLVNF5pE6aPFbtERHIS5trAFNAlHK4chKi2xMMJXCDR1ouurE6WU4m7Wni3krYkymiZAKNcJNHxRYX4kQGw8Sbl/eFmEXDF3qXOtYlMbMA65XNt1aUTZpGK8rRD+0SnNOaAjb8wYRG14QLjbc3TL3igsTmIiJSxu5pE4DGaoOaRdotVfeEQVBpihWlM96lEwG1uAnD2jp9arHG/zCTSZLZQitJ35iZ8S0VIqDaNt3n+YlDtDG/8A7iHGqRLmmPHHG79KLjEtxChcVBeRbi1+kTFHIxaTRG7kvt4QEoiHuFrcS1SFltGUyjWkTS8Ei0rQyaJCVun9o4IgIEA//GQ3aQYko2GpE51o+DolIIGsvXEhudSHCRoZknyhG4uSJ4+8BKEHzAqJERTCcTdLuixJue8siIvvQYVakFzWj26e0SpgscdrrsfcolnXivJwuaWWleUTBIyQb/p4fWEltqTVcRYjaiY0iaVsq/Lu8MeUAICS8t3qqsKfIQFXOISa0YlBcoucIuF0TCECAABMRbd1iU5xvEhDG61ftAynArCuG7MRplziUo2DtKYbi6WjCHQZYgLbQblROcAThvFSd+YoPT3hTaAEZNLG7/dIY8W6uJxZQikT5QHeRD26LCyCYgmKuaRWjpoXjHxJE2Z2iI7eXKKCRgGlw3FcKwa2zBa67cOqQiNBpkrSIi9tqcqxKQf/AFNqFuyEVrdTksGrSQjFo2iPSDcYWDbZjEsbQHQmCPdycW2JLXTM3XzLm6JrDmnNHUhLtJsfwhUQyIgxEqVxWDXvuhRaSsoQutaQ6V69YlynDwiFxEKttL3iYrC8Wjc4ibXwiatkr1EIo4ne6QgUJL0ucWXODIyrdtH3hAaMuXqTrt0IBCSi1pNL6QaiJTCMW3F3RJnjeJ7rkLxVbomSgejDUf4pNK7S0a81iXMKScwXKIkJdxcnR8PMebm3CTSc3xdyhXAUsRHuyIaawwbk65wj1MCdYIiJFbRE5wc4pVv7u5aRQdDc1svuEUx18awriKYfcTshGi3boACGUgtymXYlCq4zJyPFw3Dy94lSSCvN+TeqRMnCQIDnEBDd7lSGCA4ZD2jz+iLEtRPEHEBYt194VeV1133ugJhaC3JvtthWiJ8nuHcP+pH8I09Tu37LH8IlI6Werw0iUov7Wy9xaKnnpHxOXjaREWVNekKptx9v9rzhFARQQpcLmkQ+RQkwVu0xLtJekJLIhyQhu+nX6RUQJR9riLwthUcSCZo3tKFQjIyDJvdpTKAS6X6omSy1ZUnF6qViUjAWY5xEQ7hH+tIURnGjCxbUfFKdImtlSkeK4ju5/TrE1bDFzRD1eOMAFv005QDULhffqu2AlFNJpbhIt0KouxQSbblEqWRSnATW44+8TJ7aC1xG0fbckJLb80CtNtvmrfLlCEQEBd0sv6wq73KVx5XIsLqLpVSER/TEtCIkfdaOTqrCIICFq2i7bWkSphKUu9ptdhEtRlEzFrNwwZE3K136ekKLRAWoWGI8kSABopzIhIvtAXUIza1359MKjiliNxERbfpEqa29uJEV38vaFmvFGbi7R1T3hJRMPtC60ecKIuUm5NEsfzCfDGQr824nFthZTKvDIu11IlyyM0fUh/T9YmTBEgHutGFUhqXCc1zctYmy3UJ1xNFvVcveDF/EJrrQcVsTUcYMNCEZY7S/rH/Ip+HRURYQEm4ch8YqQ2tdbda7T9NYRqkonb8ssW+e6sIRMdpa3E+S+Qweot7f1UXn1jimNxg0RHwERp5wkvi2hi0cnVSEFi45CBXEUScm6NLqXLJdIXHK0rdwqi+NtVhBawAO4ZaZc1VP5woPJBbdbuLWJlopKCrXF6kRV/EGQ/MEBy9RU16xNtID/humXWiVKQHhzFze0dUiYpGKS5o59oiSrBSucs7WiQ+VV52waikpk3ELkIh99sSQfUT2iRWi7lyhZ5ILjLFjbi1xgJfJ5Lll41WFLkQFi0sS0r4xaRKEokK67oGUKd3/ACTBSAWiruqRLUsWoTB7hHdWJjRNwDi0nOHTGDUCJSM3EMvtLzGJU501eYtdW3X3iUREZi5cjydrjpDR5QswjICMXbbRd7wBCIvArWt20+9dYYQHNE8he7alXRNmsALlbjcRap0SEmkIYoRCIj7dbqQRWgQEpOEfZIRxGBAKfubADarButuLksTZYyiSVuJ253nAA2ohg5uQ8/eJmLTLu3aboVXElyC63HVKNpyiXLuboLSuu1rCTXEcp2Qt8qK3pWJdwgWhARerkkKtrztIfv8AikKtsyaFRubtHRolCcIBkbXNgDIRfKFwk3EuX1hZjhmFoWXaSHWF8SEkaTXOtrSJcsmte5o2kI6pBzbmyiVwiIuLZuhVDQAFtv8AmHueQVHKJswhFultu7yGEmEVXlxMiG7RUhZYnw5bXE5vdBywOepGVpiGXndSPiZYlNQWtK0fLw5a9YZIH8eEf//EACARAQEAAwEBAQEBAAMAAAAAAAECAxESACETIjEQMjP/2gAIAQIBAQgAnFjvk8wwUVH9ZP64alWimgGyEG47N+khNe6KrVH8z1ZEN1Uajn4DPPDFz7XXU+17+D5H3/HHA97qXUzL2ITdJMz5p26MS5Jv1RJK+jczU0wQOSt7PV3o9FLJfqqSuq6x+m0BOpKS/wBPmp77iJ98tdRsNUqgehJ69enlpnUrBVSpVSZIPTX8R3i1w8ubJet9z4qb3+h9yahqHHT7ccYkTdgTj/N+IhE+21VhV/zha3VYkYws7K2RF6ECBhewUrvr/iOaNlctEkxVPOPNbEk+nETkH237tKmJfEGrTIEuJ9cuT9eZxk0lsoPo3zyByO1kGjo9jV1Jo2XTWnfvhOOG+GmfY4Bmar86xxXsPOqr2+rx+jI3OTyE36a/9JmN/V5OEqdBUe3Xok3GSrN1i1MkvuuMexmesVelDgnENYcdUFGFqh65Qom8oVszammhr0nTr0wztoSjqvxj1uM+svfLNVUVuui8bKs73W4nNQTfWEPCuHVXUOIoiWqrXQZVcquSgmZKun59oOhNfnfr/wCrSiyVfy80LWZmclk2tG2WrhNdxcDkmcVaizhUIbsm5pyTRzTXKFzbPv8ASpOtfT9J9L1Xras583wQlGlj07MeRkmpSvTcUZd/WDmYTFzP3ul4o/bwc5W2p2yeDiqkMet+/v3/xAAqEQEAAgIBBAICAQMFAAAAAAABABECITESQVFhIpFxgQMTMqFScpKxwf/aAAgBAgEJPwATwzjzoufycZMyUMu1dvzxML3tXtMDbv4sODQXqZaNbsWp0mVKNsenX9t6nU2d/wDy4eku9webu4tWdiYa6QGJ/wAo9MXI+2bHzxMd740MK1sO24/nKZDZ5Z70MviqqZnooKiW14WVfJX1NvsWY5BxVJDJbrcyxgV4bm2oY0DvxHFW99tTJExpMRme/wA3UzemyvfqYl009idRf5YZ5f7uLldocmUyG8TnW4CeDtOZ/E/TOzqm5imIV1NzWIPnf4hl/bpy7b7+5k3XhmQE5LWzgnFO0j8rOCYZdPbqYA2PupaCrp5uY+vcGtx3yDcyYnTXFVuPFlX3iVVc8TlaemORWN3z2uZOzgjkfK1dwf6ezYc3MSzs8VFMbxuvEv6th0lZaqPbY7mGNFl3UaPV7n/cpAb3CtVM61wa3vxMb6lNX5jWTjQ2auZW06crqW/I2HuDz326mSANQ+9TJLSg124mO7b7kAd81CxN6Jjo+JOn6YpWXUmWX+I68vaAnNd5hu3TKveSc2znH+PLJovmDblf7JkvyGZUVlpJVdIxx6aEjoSqO009dMeNa7QTqqhmJ9QDEyugl1RkDLd/6e0wHLq3fb6mRfB0tUVxHloO3FxdX+4UYs/GvcGscU5GNYgaNy3Q/U+NOL+65j4ZgeAn8/8AllvF7KmmZJ08HHePUnAt8QujF17LmvkL+5xjkA8VqChjZMVtxKWq7w73q9zHHevMaXHL9xOlxMrlAVVO9xVchnTHha1XMy3V8cRytadMHY71qtwcrwQK1E+IFHqXzcHHUXbaj3iDqt3q5mO/q4bSz0VM3HEB9ahzj67TBElT/8QAHxEBAQADAQEBAAMBAAAAAAAAAQIAERIDISITMTJB/9oACAEDAQEIAK9bndYUWiP4j52TWiWSVZhs+RTDlN7zlJ3K7rU9URM11XWlSitlRX9laZTbh07a+f8ALrXGTYq0MUbZkaUJNG31OEybpTL+0VJfSQaBclhXKk64yRTU6vKgV3zTIzw7arli6o2zrdaVZn5ty/1zqdnRM075vU0CFcU5RqrI9NlAnl5xvXDjNRrj+p3YWWGasqzCtQq+nZmz9OaCYamP16kgT6Gq9OtaCvSzEd2lzudm545csodM9B01cz9vxjpaH0XzzR8wSroxr/A+a1/IZFHmeW303IyUKadbWn7/AETTsfuXo3WbeWJIdazSt1Md89Zdruie4upfUoYnCeZvKgl8wFZyjXFVYZs6/P3orNGVVHXnEV+b3Vb+mu71RVc+s59emvVD19JlYfUkRnoWeo83I0+W6klkynU/Ksr4O5dT/NWSejrVhBXczNmp44soCn5J3XiLUM+m8dHr1PnPp/Jy3RMSPO/IDzA85culJg+/BeUd78sjXXIOq1H+fG9HiUxDUaM7Jit75ubo87fSRuK6AaoiO4qTzZSp4EeKgcDTLnO84rL/ADORzP6wgurll/zeU79PMpqaGcfOpfJPhdd1cvr1RzxOdj/Di785g6J25suSsfT+tbM//8QAKhEAAgICAQMDBAIDAQAAAAAAAREAIQIxQRJRYSKBkQMycaGSwUKisvD/2gAIAQMBCT8AOJe4LaVlT6QDExAJHL/rczVOhMqA7iHmyTMbN8VGmiEJi72rgAX/ALiBcgpTIaiauzMxvUwP8YsveLEyiO0NDvZHmXyCYPaAgA9hBtWcZ0hcgzEjuWS4MkG9r9wkhK/mUPBAmQJHkGECnBlCX3pSgzVQkM924MgAqNbmIROyQRMKXaYglfEypj3cTHtOnHyI5dg/ExIs6uoS59sz/Yna2JliT2CheVdqhGwwOa4mI33BmJJlcb5hZqgZ9pHKmWPUv8Q4Sdjw4USlfiZbtcQi13g8EiYRt7brsoPdcRtvW5Q2HqDEspamOO1cANfiEdaB2ZmUeQbcDKKfeAQ9RYcGjRFOZ5NArcvLyqn/ADGCSFUPILMwZf5r3mS6VtQDINog8TEgMWMVF9rRPidvwLExBZEP9wA0W/HMy7V4Ma9OnDY8mZN2YMv5CI0ACMTBe0HcJB/UzKqxCVWINTRzAFrUIQCgxx9Jo7uYhk46Mb6qmOTsGDwWZbxYlPZMOtkTLKZE5EbJiYyTEQWOurmfUy6emlzBWz1WzBq/MAsgfibyxh8+rxCCyEEZs5FuK2Nd5ZIImNpPvMj3Jn0v9YV7Fy5iPVs7gT5AW4UyR8S6IHtN5A5EC24QCcpliCAS1Da54mR73UDAI9rj6mQpy2xEgF8QQfk9T1Maa3udKx1YhFEVcIxWTJcfqdnzF2hGVn5MVAgVxAxfCuYKr8qGgUfJmIyyOR/cKWXmZAgx/An/2Q=="
        ,
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
                avatar: this.defaultAvatar
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
  