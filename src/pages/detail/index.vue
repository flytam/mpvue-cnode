<template>
  <div  class='container'>
      <sendReply v-if='sendVisible' @close-modal='closeModal' @reply-success='replySuccess' :content='content' :topicId='id' :replyId='replyId'></sendReply>
    <div>
      <div class='header'>
        <div class='author'>
          <img class='author-img' :src='detailData.author && detailData.author.avatar_url' alt="头像">
          <span class='name'>{{detailData.author&& detailData.author.loginname}}</span>
        </div>
        <div class='list'><img @click.stop="collect" :src="detailData.is_collect?'../../../static/star2.png':'../../../static/star1.png'" style='width:40rpx;height:40rpx;'><span>楼主</span></div>
      </div>
      <scroll-view class='body' scroll-y='true'  :scroll-top="top" enable-back-to-top='true' @scrolltolower='getMore'>
        <div class='title'>
          <p class='big'>{{detailData.title}}</p>
          <div class='time-info'>
            <span>发布于:{{formatCreateAt}}</span>
            <span>浏览:{{detailData.visit_count}}</span>
            <span>评论:{{detailData.reply_count}}</span>
          </div>
        </div>
        <img class='up-png' src="../../../static/up.png" mode='widthFix' @click.stop="goTop">
        <div v-if='!sendVisible' class='reply-buton' @click.stop="showReplyModal">评论</div>
        <div class='content'>
          <wemark :mdData='detailData.content'></wemark>
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
            <p class='reply-content'>
              <wemark :mdData='item.content'></wemark>
            </p>
            <div class='foot'>
              <div :data-replyid='item.id' :data-originindex='originindex' @click.stop="upOrCancel($event)"><img class='icon' :src="(!item.is_uped)?'../../../static/good1.png':'../../../static/good2.png'" /><span>点赞:{{item.ups.length}}</span></div>
              <div :data-loginname='item.author.loginname' @click.stop="showReplyModal($event)" :data-replyid='item.id'><img class='icon' src='../../../static/chat.png' /><span>回复</span></div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { api } from "../../const";
import { passTime } from "../../utils";
import sendReply from "../../components/sendReply";
import wemark from "mpvue-wemark";
export default {
  components: {
    wemark,
    sendReply
  },
  mounted() {
    this.getData();
  },
  computed: {
    formatCreateAt() {
      return passTime(this.detailData.create_at);
    },
    formatReplies() {
      return this.currentReplies.map(_ => {
        return {
          ..._,
          create_at: passTime(_.create_at)
        };
      });
    }
  },

  methods: {
    async getData() {
      const accesstoken = wx.getStorageSync("accesstoken");
      //this.id = wx.getStorageSync("topicid");
      wx.showLoading({
        title: "加载中"
      });
      const res = await this.$http.get(`${api}/topic/${this.id}`, {
        mdrender: false,
        accesstoken
      });
      wx.hideLoading();
      if (res.data.success) {
        this.detailData = res.data.data;
        this.currentReplies = res.data.data.replies.reverse().splice(0, 10);
        this.remainReplies = res.data.data.replies;
        //this.article = res.data.content;
      } else {
      }
    },
    async collect() {
      const accesstoken = wx.getStorageSync("accesstoken");
      const topic_id = this.id;
      if (this.detailData.is_collect) {
        // /topic_collect/de_collect
        const res = await this.$http.post(`${api}/topic_collect/de_collect`, {
          accesstoken,
          topic_id
        });
        if (res.data.success) {
          wx.showToast({
            title: "取消收藏成功",
            icon: "none",
            duration: 2000
          });
          this.detailData.is_collect = false;
        }
      } else {
        //  /topic_collect/collect
        const res = await this.$http.post(`${api}/topic_collect/collect`, {
          accesstoken,
          topic_id
        });
        if (res.data.success) {
          wx.showToast({
            title: "收藏成功",
            icon: "none",
            duration: 2000
          });
        }
        this.detailData.is_collect = true;
      }
    },
    goTop() {
      // console.log(11);
      setTimeout(() => (this.top = 0));
      this.top = 1;
      // wx.pageScrollTo({
      //   scrollTop: 500,
      //   duration: 300
      // });
    },
    getMore() {
      if (this.remainReplies.length > 0) {
        this.currentReplies = [
          ...this.currentReplies,
          ...this.remainReplies.splice(0, 10)
        ];
      } else {
        wx.showToast({
          title: "无更多数据",
          icon: "none",
          duration: 2000
        });
      }
    },
    async upOrCancel(e) {
      // / todo 防抖
       console.log(e);
      const accesstoken = wx.getStorageSync("accesstoken");
      if (accesstoken) {
        try {
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
           // e.currentTarget.dataset.originindex
           this.currentReplies[e.currentTarget.dataset.originindex].is_uped = res.data.action === 'up';
          }
         // this.getData();
        } catch (e) {
          wx.showToast({
            title: e.response.data.error_msg,
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
    },
    showReplyModal(e) {
      const replyname = e.currentTarget.dataset.loginname;
      if (replyname) {
        this.content = `@${replyname} `;
      } else {
        this.content = "";
      }

      this.replyId = e.currentTarget.dataset.replyid;
      this.sendVisible = true;
    },
    replySuccess() {
      wx.showToast({
        title: "评论成功",
        icon: "none",
        duration: 1500
      });
      this.closeModal();
      this.getData();
    },
    closeModal() {
      this.sendVisible = false;
    }
  },
  onLoad() {
    this.id = this.$root.$mp.query.topicid;
  },
  data() {
    return {
      detailData: {},
      remainReplies: [],
      currentReplies: [],
      content: "",
      sendVisible: false,
      id: "",
      replyId: "",
      top: 0
    };
  }
};
</script>

<style lang='scss' scoped>
.container {
  height: 100vh;
  background-color: rgb(245, 245, 239);
  .header {
    display: flex;
    justify-content: space-between;
    background-color: white;
    margin-bottom: 20rpx;
    padding: 30rpx;
    .author {
      color: $color;
      display: flex;
      align-items: center;
      .author-img {
        width: 64rpx;
        height: 64rpx;
      }
      .name{
        margin-left: 20rpx;
      }
    }
    .list {
      display: flex;
      align-items: center;
    }
  }
  .body {
    height: 90vh;
  }
  .title {
    background-color: white;
    margin-bottom: 20rpx;
    padding: 30rpx;
    .big {
      font-size: 50rpx;
    }
    .time-info {
      display: flex;
      justify-content: space-around;
    }
  }
  .reply-buton {
    border-radius: 50%;
    width: 100rpx;
    height: 100rpx;
    text-align: center;
    font-size: 30rpx;
    position: fixed;
    line-height: 100rpx;
    background-color: $color;
    top: 86vh;
    left: 81vw;
    color: white;
  }
  .up-png {
    width: 100rpx;
    top: 75vh;
    left: 81vw;
    position: fixed;
  }
  .content {
    background-color: white;
    margin-bottom: 20rpx;
    padding: 30rpx;
  }
}
.reply {
  background-color: white;
  margin-bottom: 20rpx;
  padding: 30rpx;
  .reply-container {
    padding: 30rpx;
    .head {
      color: $color;
      display: flex;
      align-items: center;
      .head-img {
        width: 64rpx;
        height: 64rpx;
      }
      .info {
        flex-direction: column;
        display: flex;
        margin-left: 26rpx;
        .time {
          color: $borderColor;
        }
      }
    }
    .reply-content {
      font-size: 40rpx;
      & + & {
        border-top: 2rpx solid $borderColor;
      }
    }
    .foot {
      display: flex;
      & > div {
        margin-right: 20rpx;
        display: flex;
        align-items: center;
      }
      .icon {
        width: 56rpx;
        height: 56rpx;
      }
    }
  }
}
</style>
