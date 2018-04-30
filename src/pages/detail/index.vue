<template>
  <div class='container'>
    <div class='header'>
      <div class='author'>
        <img class='author-img' :src='detailData.author && detailData.author.avatar_url' alt="头像">
        <span class='name'>{{detailData.author&& detailData.author.loginname}}</span>
      </div>
      <span>楼主</span>
    </div>
    <div class='body'>
      <div class='title'>
        <p class='big'>{{detailData.title}}</p>
        <div class='time-info'>
          <span>发布于:{{formatCreateAt}}</span>
          <span>浏览:{{detailData.visit_count}}</span>
          <span>评论:{{detailData.reply_count}}</span>
        </div>
      </div>
      <div class='reply-buton'>评论</div>
      <div class='content'>
        {{detailData.content}}
        <!-- <import src='./wemark/wemark.wxml'/>
              <template is="wemark" :data="{...wemark}">
</template>-->
        <!-- <wemark :wemark='wemark'></wemark> -->
      </div>
      <div class='reply'>
        <div>评论：</div>
        <div class='reply-container' v-for='(item,originindex) in formatReplies' :key='item.id' :data-id='item.id'>
            <div class='head'>
            <img class='head-img' :src='item.author.avatar_url' :data-loginname='item.author.loginname' @click.stop='goAuthorPage'>
            <div class='info'>
              <span>{{item.author.loginname}}</span>
              <span class='time'>{{item.create_at}}</span>
            </div>
          </div>
          <p class='reply-content'>{{item.content}}</p>
          <div class='foot'>
            <div :data-replyid='item.id' :data-originindex='originindex' @click.stop="upOrCancel($event)"><img class='icon' v-if='!item.is_uped' src='../../../static/good1.png' /><img class='icon' v-if='item.is_uped' src='../../../static/good2.png'/><span>点赞:{{item.ups.length}}</span></div>
            <div><img class='icon' src='../../../static/chat.png'/><span>回复</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../../const";
import { passTime } from "../../utils";
import { parse } from "./wemark1/wemark.js";
import wemark from "./wemark1/wemark.vue";
export default {
  components: {
    wemark
  },
  mounted() {
    this.getData();
  },
  computed: {
    formatCreateAt() {
      return passTime(this.detailData.create_at);
    },
    formatReplies() {
      return (
        this.detailData &&
        this.detailData.replies &&
        this.detailData.replies
          .map(_ => {
            return {
              ..._,
              create_at: passTime(_.create_at)
            };
          })
          .reverse()
      );
    }
  },
  methods: {
    async getData(tab, init) {
      const id = wx.getStorageSync("topicid");
      wx.showLoading({
        title: "加载中"
      });
      const res = await this.$http.get(`${api}/topic/${id}`, {
        mdrender: false
      });
      wx.hideLoading();
      if (res.data.success) {
        this.detailData = res.data.data;
        parse(res.data.data.content, this);
      } else {
      }
    },
    async upOrCancel(e) {
      // todo 防抖
      console.log(e);
      const accesstoken = wx.getStorageSync("accesstoken");
      if (accesstoken) {
        const res = await this.$http.post(
          `${api}/reply/${e.currentTarget.dataset.replyid}/ups`,
          {
            accesstoken
          }
        );
        if (res.data.success) {
          wx.showToast({
            title: "200",
            icon: "none",
            duration: 2000
          });
        } else {
          wx.showToast({
            title: res.data.error_msg,
            icon: "none",
            duration: 2000
          });
        }

        //  originindex
      } else {
        wx.showToast({
          title: "请先登录",
          icon: "none",
          duration: 2000
        });
      }
    }
  },
  data() {
    return {
      detailData: {},
      wemark: {}
    };
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: rgb(245, 245, 239);
}
.header {
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 20rpx;
  padding: 30rpx;
}
.author {
  color: rgb(65, 184, 131);
  display: flex;
  align-items: center;
}
.author-img {
  width: 64rpx;
  height: 64rpx;
}
.head {
  color: rgb(65, 184, 131);
  display: flex;
  align-items: center;
}
.head-img {
  width: 64rpx;
  height: 64rpx;
}
.info {
  flex-direction: column;
  display: flex;
  margin-left: 26rpx;
}
.time {
  color: #888;
}
.reply-buton {
  border-radius: 50%;
  width: 100rpx;
  height: 100rpx;
  text-align: center;
  font-size: 30rpx;
  position: fixed;
  line-height: 100rpx;
  background-color: rgb(65, 184, 131);
  top: 86vh;
  left: 81vw;
  color: white;
}
.title {
  background-color: white;
  margin-bottom: 20rpx;
  padding: 30rpx;
}
.reply-container {
  padding: 30rpx;
}
.reply-container + .reply-container {
  border-top: 2rpx solid #888;
}
.reply-content {
  font-size: 40rpx;
}
.content {
  background-color: white;
  margin-bottom: 20rpx;
  padding: 30rpx;
}
.icon {
  width: 56rpx;
  height: 56rpx;
}
.big {
  font-size: 50rpx;
}
.foot {
  display: flex;
}
.foot > div {
  margin-right: 20rpx;
  display: flex;
  align-items: center;
}
.time-info {
  display: flex;
  justify-content: space-around;
}
.reply {
  background-color: white;
  margin-bottom: 20rpx;
  padding: 30rpx;
}
/* .body{
        background-color: white;
      } */
</style>
