<template>
  <div class='container'>
    <div class='header'>
      <div :class='{ active: tab==="all" }' @click.stop='changeTab($event)' data-tab='all' :data-offset='0'>全部</div>
      <div :class='{ active: tab==="good" }' @click.stop='changeTab($event)' data-tab='good' :data-offset='1'>精华</div>
      <div :class='{ active: tab==="share" }' @click.stop='changeTab($event)' data-tab='share' :data-offset='2'>分享</div>
      <div :class='{ active: tab==="job" }' @click.stop='changeTab($event)' data-tab='job' :data-offset='3'>招聘</div>
      <div :class='{ active: tab==="ask" }' @click.stop='changeTab($event)' data-tab='ask' :data-offset='4'>问答</div>
    </div>
    <div class="containers" :animation='animation'>
      <div v-for='(listItem,listIndex) in list' :key='listIndex'>
        <scroll-view scroll-y class='scroll-container' @scrolltolower='getMore'>
          <div v-for='item in cardData[listItem]' :key='item.id'>
            <card :item='item'></card>
          </div>
        </scroll-view>
      </div>
    </div>
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
      cardData: {
        all: [],
        good: [],
        share: [],
        job: [],
        ask: []
      },
      isLoading: false,
      list: ["all", "good", "share", "job", "ask"],
      animation: {}
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
      wx.showLoading({
        title: "加载中"
      });
      this.isLoading = true;
      const res = await this.$http.get(`${api}/topics`, {
        tab,
        limit: 5,
        page
      });
      wx.hideLoading();
      if (res.data.success) {
        if (this.cardData[tab].length > 0 && page === 0) {
          // 下拉刷新
          this.cardData[tab] = res.data.data;
          // res.data.data;
        } else {
          // 底部加载更多 h和初始得时候
          this.cardData[tab] = [...this.cardData[tab], ...res.data.data];
        }
      } else {
        // 获取数据失败
      }
      this.isLoading = false;
    },
    async getMore() {
      if (!this.isLoading) {
        await this.getData(this.tab, this.page + 1);
        this.page += 1;
      }
    },
    async onPullDownRefresh() {
      await this.getData(this.tab, 0);
      wx.stopPullDownRefresh();
    },
    changeTab(e) {
      const currentTab = e.target.dataset.tab;
      const offset = e.target.dataset.offset;
      this.tab = currentTab;
      this.page = 0;
      this.getData(currentTab, 0);
      this.animation = wx
        .createAnimation({
          duration: 1000,
          timingFunction: "ease"
        })
        .left(`-${offset * 100}vw`)
        .step()
        .export();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: rgb(245, 245, 249);
  font-size: 30rpx;
  .header {
    display: flex;
    & > div {
      width: 20%;
      background-color: #41b883;
      color: white;
      text-align: center;
      height: 86rpx;
      line-height: 86rpx;
    }
  }
  .containers {
    display: flex;
    position: relative;
    .scroll-container {
      height: 90vh;
      width: 100vw;
    }
  }
}
.header .header > div + .header > div {
  border-left: 2rpx solid white;
}
.active {
  font-weight: bold;
}
</style>

