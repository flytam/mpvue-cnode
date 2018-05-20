<template>
  <div class="container">
    <login :visible='visible' v-on:modalClose='closeModalEvent'></login>
    <div class='list'>
      <span>标题:</span>
      <input class='input' type="text" placeholder="最少10个字" v-model="title">
    </div>
    <picker class='picker' @change="bindPickerChange($event)" :value="index" :range="pickerData">
      <span>选择主题:</span><span style='margin-left:400rpx;'>{{pickerData[index]}}</span>
    </picker>
    <div class='tabs'>
      <div :class='{selected:tab==="markdown"}' @click.stop='changeTab($event)' data-tab='markdown'>markdown</div>
      <div :class='{selected:tab==="preview"}' @click.stop='changeTab($event)' data-tab='preview'>预览</div>
    </div>
    <textarea v-show="tab==='markdown'" class='textarea' v-model="content"></textarea>
    <div v-show="tab==='preview'">
     <wemark :mdData='content' customStyle="min-height:500rpx;background-color:white;margin-top:-20rpx;margin-bottom:30rpx;"></wemark>
     </div>
    <button @click.stop="handle">发帖</button>
  </div>
</template>

<script>
import login from "../../components/login";
import wemark from "mpvue-wemark";
import { api } from "../../const";
export default {
  components: {
    login,
    wemark
  },

  watch: {
    content(next) {
      console.log(next);
    }
  },
  data() {
    return {
      pickerData: ["提问", "招聘", "分享", "开发"],
      index: "3",
      title: "",
      content: "",
      visible: false,
      tab: "markdown" // or preview
    };
  },
  methods: {
    bindPickerChange(e) {
      // console.log(e)
      this.index = e.mp.detail.value;
    },
    changeTab(e) {
      this.tab = e.target.dataset.tab;
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

<style lang='scss' scoped>
.container {
  height: 100vh;
  background-color: rgb(245, 245, 249);
  .list {
    display: flex;
    justify-content: space-between;
    background-color: white;
    margin-bottom: 30rpx;
    height: 90rpx;
    padding: 0 30rpx;
    line-height: 90rpx;
    .input {
      height: 90rpx;
      line-height: 90rpx;
    }
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
  .tabs {
    display: flex;
    background-color: white;
    & > div {
      width: 50%;
      text-align: center;
    }
  }
  .textarea {
    width: 100%;
    background-color: white;
    margin-bottom: 30rpx;
    height: 500rpx;
    padding: 0 30rpx;
    box-sizing: border-box;
  }
}
.selected {
  color: $color;
  border-bottom: 2rpx solid $color;
}
</style>
