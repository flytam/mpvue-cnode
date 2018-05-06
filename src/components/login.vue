<template>
<div class='mask' v-if='visible'>
  <div class="container">
    <input class='input' type="text" v-model='accesstoken' placeholder='请输入accesstoken'>
    <button class='button' :disabled='!accesstoken.length' @click.stop="login">登录</button>
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
    async login() {
      const res = await this.$http.post(`${api}/accesstoken`, {
        accesstoken: this.accesstoken
      });
      if (res.data.success) {
        const from = wx.getStorageSync("from");
        wx.setStorageSync("me", res.data.loginname);
        wx.setStorageSync("accesstoken", this.accesstoken);
        // 触发关闭
        this.$emit("modalClose");
      } else {
        wx.showToast({
          title: "accesstoken错误",
          icon: "none",
          duration: 2000
        });
      }
    }
  }
};
</script>
<style scoped>
.mask {
  position: fixed;
  background-color: white;
  height: 100vh;
  width: 100vw;
  z-index: 2333;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button {
  width: 600rpx;
  margin-top: 150rpx;
}
.input {
  border-bottom: 2rpx solid #888;
  width: 600rpx;
  margin-top: 200rpx;
}
</style>
