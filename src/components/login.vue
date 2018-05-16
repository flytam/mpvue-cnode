<template>
<div class='mask' v-if='visible'>
  <div class="container">
    <input class='input' type="text" v-model='accesstoken' placeholder='请输入accesstoken'>
    <button class='button' :disabled='!accesstoken.length' @click.stop="clickLogin">登录</button>
    <button class='button' @click.stop="scale" style='margin-top: 20rpx;'>扫码登陆</button>
    <div class='tips'>登录网页版cnode后在设置中查看accesstoken或二维码</div>
  </div>
</div>

</template>
<script>
import { api } from "../const";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      accesstoken: ""
    };
  },
  methods: {
    async login(accesstoken) {
      const res = await this.$http.post(`${api}/accesstoken`, {
        accesstoken
      });
      if (res.data.success) {
        wx.setStorageSync("me", res.data.loginname);
        wx.setStorageSync("accesstoken", accesstoken);
        // 触发关闭
        this.$emit("modalClose");
      } else {
        wx.showToast({
          title: "accesstoken错误",
          icon: "none",
          duration: 2000
        });
      }
    },
    clickLogin(){
      this.login(this.accesstoken);
    },
    scale() {
      wx.scanCode({
        success: async res => {

          this.login(res.result);
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.mask {
  position: fixed;
  background-color: white;
  height: 100vh;
  width: 100vw;
  z-index: 2333;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .input {
      border-bottom: 2rpx solid $borderColor;
      width: 600rpx;
      margin-top: 200rpx;
    }
    .button {
      width: 600rpx;
      margin-top: 150rpx;
    }
    .tips {
      font-size: 22rpx;
      color: #888;
      margin-top: 10rpx;
    }
  }
}
</style>
