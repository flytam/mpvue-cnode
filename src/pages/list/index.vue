<template>
  <div class="container">
    <div class='margin' v-for='item in currentData' :key='item.id'>
      <card :item='item' :hidden='true'></card>
    </div>
  </div>
</template>

<script>
import { api } from "../../const";
import card from "../../components/card";
export default {
  data() {
    return {
      currentData: []
    };
  },
  components: {
    card
  },
  onShow() {
    const from = wx.getStorageSync("fromItem");
    // from 最近话题 最近回复
    switch (from) {
      case "topic":
      case "reply":
        this.getData(from);
        wx.setNavigationBarTitle({
          title: `${from === "topic" ? "最近话题" : "最近回复"}`
        });
        break;
      case "collect":
        this.getCollect();
        wx.setNavigationBarTitle({
          title: `我的收藏`
        });
    }
  },
  methods: {
    async getData(from) {
      const me = wx.getStorageSync("me");
      if (me) {
        const res = await this.$http.get(`${api}/user/${me}`);
        if (res.data.success) {
          this.currentData =
            from === "topic"
              ? res.data.data.recent_topics
              : res.data.data.recent_replies;
        }
      } else {
        console.log("no me");
      }
    },
    async getCollect() {
      // /topic_collect/
      const me = wx.getStorageSync("me");
      const res = await this.$http.get(`${api}/topic_collect/${me}`);
      if (res.data.success) {
        this.currentData = res.data.data;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.container {
  background-color: rgb(245, 245, 249);
  min-height: 100vh;
  .margin {
    margin-bottom: 20rpx;
  }
}
</style>
