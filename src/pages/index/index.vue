<template>
  <div class='container'>
    <div class='header'>
      <div  :class='{ active: tab==="all" }' @click.stop='changeTab($event)' data-tab='all'>全部</div>
      <div :class='{ active: tab==="good" }' @click.stop='changeTab($event)' data-tab='good'>精华</div>
      <div :class='{ active: tab==="share" }' @click.stop='changeTab($event)' data-tab='share'>分享</div>
      <div :class='{ active: tab==="job" }' @click.stop='changeTab($event)' data-tab='job'>招聘</div>
      <div :class='{ active: tab==="ask" }' @click.stop='changeTab($event)' data-tab='ask'>问答</div>
    </div>
    <scroll-view scroll-y class='scroll-container'>
      <div v-for='item in cardData' :key='item.id' :data-id='item.id' @click.stop="goDetail($event)">
        <card :item='item'></card>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import card from "@/components/card";
import { api } from "../../const";
export default {
  data() {
    return {
      page: 0,
      tab: "all",
      cardData: []
    };
  },

  components: {
    card
  },
  watch: {},
  mounted() {
    this.getData("all");
  },
  methods: {
    async getData(tab, init) {
      wx.showLoading({ title: "加载中" });
      const res = await this.$http.get(`${api}/topics`, {
        tab,
        limit: 10,
        page: this.page
      });
      //输出请求数据
      wx.hideLoading();
      if (res.data.success) {
        this.cardData = res.data.data;
      } else {
      }
    },
    changeTab(e) {
      const currentTab = e.target.dataset.tab;
      this.tab = currentTab;
      this.getData(currentTab);
    },
    goDetail(e) {
      wx.setStorageSync("id", e.currentTarget.dataset.id);
      console.log(e.currentTarget.dataset.id);
      wx.navigateTo({
        url: "../detail/main"
      });
    }
  }
};
</script>

<style scoped>
.container {
  background-color: rgb(245, 245, 249);
  font-size: 30rpx;
}
.scroll-container {
  height: 90vh;
}
.header {
  display: flex;
}
.header > div {
  width: 20%;
  background-color: rgb(65, 184, 131);
  color: white;
  text-align: center;
  height: 86rpx;
  line-height: 86rpx;
}
.header > div + .header > div {
  border-left: 2rpx solid white;
}
.active {
  font-weight: bold;
}
</style>

