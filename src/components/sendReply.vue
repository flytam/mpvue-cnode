<template>
<div class="mask" @click.stop="closeModal">
  <div class="container"  @click.stop="prevent">
 <textarea class='textarea' v-model="content" placeholder="说点啥....."></textarea>
 <button class="button" @click.stop="send">提交</button>
  </div>
</div>  
</template>
<script>
import { api } from "../const";
export default {
  props: {
    topicId: String,
    replyId: {
      default: "",
      type: String
    },
    content: {
      default: "",
      type: String
    }
  },
  methods: {
    prevent() {},
    async send() {
      const accesstoken = wx.getStorageSync("accesstoken");
      try {
        const res = await this.$http.post(
          `${api}/topic/${this.topicId}/replies`,
          {
            accesstoken,
            content: this.content,
            reply_id: this.replyId
          }
        );
        if (res.data.success) {
          this.content = "";
          this.$emit("reply-success");
        }
      } catch (e) {
        wx.showToast({
          title: e.response.data.error_msg,
          icon: "none",
          duration: 2000
        });
      }
    },
    closeModal() {
      this.$emit("close-modal");
    }
  }
};
</script>
<style lang='scss' scoped>
.mask {
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    .textarea {
      border: 2rpx solid $borderColor;
    }
    .button {
      background-color: $color;
      color: white;
      width: 300rpx;
      margin-top: 26rpx;
    }
  }
}
</style>
