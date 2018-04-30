<template>
  <div class='container'>
    <div class='header'>
      <div  :class='{ active: tab==="all" }' @click.stop='changeTab($event)' data-tab='all'>全部</div>
      <div :class='{ active: tab==="good" }' @click.stop='changeTab($event)' data-tab='good'>精华</div>
      <div :class='{ active: tab==="share" }' @click.stop='changeTab($event)' data-tab='share'>分享</div>
      <div :class='{ active: tab==="job" }' @click.stop='changeTab($event)' data-tab='job'>招聘</div>
      <div :class='{ active: tab==="ask" }' @click.stop='changeTab($event)' data-tab='ask'>问答</div>
    </div>
    <scroll-view scroll-y class='scroll-container' @scrolltolower='getMore'>
      <div v-for='item in cardData' :key='item.id'>
        <card :item='item'></card>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import card from "@/components/card";
import { api } from "../../const";
import { getURL } from "../../utils/index";
export default {
  data() {
    return {
      page: 0,
      tab: "all",
      cardData: [],
      isLoading: false
    };
  },

  components: {
    card
  },
  watch: {},
  mounted() {
    this.getData("all", 0);
  },
  methods: {
    async getData(tab, page) {
      wx.showLoading({ title: "加载中" });
      this.isLoading = true;
      const res = await this.$http.get(`${api}/topics`, {
        tab,
        limit: 5,
        page
      });
      wx.hideLoading();
      if (res.data.success) {
        if (this.cardData.length > 0 && page === 0) {
          // 下拉刷新
          this.cardData = res.data.data;
        } else {
          // 底部加载更多
          this.cardData = [...this.cardData, ...res.data.data];
        }
      } else {
        // 获取数据失败
      }
      this.isLoading = false;
    },
    async getMore() {
      if (!this.isLoading) {
        await this.getData(this.tab,this.page+1);
        this.page += 1;
      }
    },
    async onPullDownRefresh(){
      await this.getData(this.tab,0);
      wx.stopPullDownRefresh();
    },
    changeTab(e) {
      const currentTab = e.target.dataset.tab;
      this.tab = currentTab;
      this.page = 0;
      this.getData(currentTab,0);
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
  background-color: #41b883;
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

