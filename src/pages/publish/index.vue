<template>
  <div class="container">
    <login :visible='visible' v-on:modalClose='closeModalEvent'></login>
    <div class='list'>
      <span>标题:</span>
      <input class='input' type="text" placeholder="最少10个字" v-model="title">
    </div>
      <picker  class='picker' @change="bindPickerChange($event)" :value="index" :range="pickerData">
        <span>选择主题:</span><span style='margin-left:400rpx;'>{{pickerData[index]}}</span>
      </picker>
    <textarea class='textarea' v-model="content" ></textarea>
    <button @click.stop="handle">发帖</button>
  </div>
</template>
<script>
import login from "../../components/login";
import { api } from "../../const";
export default {
  components: {
    login
  },
  data() {
    return {
      pickerData: ["提问", "招聘", "分享", "开发"],
      index: "3",
      title: "",
      content: "",
      visible: false
    };
  },
  methods: {
    bindPickerChange(e) {
      // console.log(e)
      this.index = e.mp.detail.value;
    },
    async handle() {
      const trans = ["ask", "job", "share", "dev"];
      const accesstoken = wx.getStorageSync("accesstoken");
      if (accesstoken) {
        try {
          const res = await this.$http.post(`${api}/topics `, {
            accesstoken,
            title: this.title,
            tab: trans[this.index],
            content: this.content
          });
          if (res.data.success) {
            wx.showToast({
              title: "发帖成功",
              icon: "none",
              duration: 2000
            });
          }
        } catch (e) {
          wx.showToast({
            title: e.response.data.error_msg,
            icon: "none",
            duration: 2000
          });
        }
      }
    },
    closeModalEvent() {
      this.visible = false;
    }
  },
  onShow() {
    const accesstoken = wx.getStorageSync("accesstoken");
    if (!accesstoken) {
      this.visible = true;
    }
  }
};
</script>
<style scoped>
.container {
  height: 100vh;
  background-color: rgb(245, 245, 249);
}
.list {
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 30rpx;
  height: 90rpx;
  padding: 0 30rpx;
  line-height: 90rpx;
}
.picker {
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 30rpx;
  height: 90rpx;
  line-height: 90rpx;
  padding: 0 30rpx;
}
.input {
  height: 90rpx;
  line-height: 90rpx;
}
.textarea {
  width: 100%;
  background-color: white;
  margin-bottom: 30rpx;
  height: 500rpx;
  padding: 0 30rpx;
}
</style>
