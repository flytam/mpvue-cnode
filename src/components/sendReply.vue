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
      console.log(this.content, this.replyId, this.topicId);
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
          this.content = '';
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
<style scoped>
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
}
.mask {
  height: 100vh;
  width: 100vw;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
}
.textarea {
  border: 2rpx solid #888;
}
.button {
  background-color: #41b883;
  color: white;
  width: 300rpx;
  margin-top: 26rpx;
}
</style>
