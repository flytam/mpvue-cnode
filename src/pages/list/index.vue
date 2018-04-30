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
    wx.setNavigationBarTitle({
      title: `${from === "topic" ? "最近话题" : "最近回复"}`
    });
    this.getData(from);
  },
  methods: {
    async getData(from) {
      const me = wx.getStorageSync("me");
      if (me) {
        const res = await this.$http.get(`${api}/user/${me}`);
        if (res.data.success) {
          this.currentData =
            from === "topic" ? res.data.data.recent_topics : res.data.data.recent_replies;
        }
      } else {
        console.log("no me");
      }
    }
  }
};
</script>
<style scoped>
.container{
  background-color: rgb(245, 245, 249);
  min-height: 100vh;
}
.margin{
  margin-bottom: 20rpx;
}
</style>
