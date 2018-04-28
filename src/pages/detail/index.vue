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
        {{detailData.title}}
      </div>
      <div class='time-info'>
        <span>发布于：{{detailData.create_at}}</span>
        <span>浏览数：{{detailData.visit_count}}</span>
        <span>评论数：{{detailData.reply_count}}</span>
      </div>
      <div class='content'>
        {{detailData.content}}
      </div>
      <div class='reply'>
        <div>评论：</div>
        <div class='reply-container' v-for='item in detailData.replies' :key='item.id' :data-id='item.id'>
          <img class='author-img' :src="item.author.avatar_url" alt="头像">
          <div class='name'>
            <span>{{item.author.loginname}}</span>
            <span>{{item.create_at}}</span>
          </div>
          <p>{{item.content}}</p>
          <div class='foot'>
            <span>点赞数：{{item.ups.length}}</span>
            <span>回复</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../../const";
export default {
  components: {},
  mounted() {
    this.getData();
  },
  methods: {
    async getData(tab, init) {
      const id = wx.getStorageSync("id");
      wx.showLoading({
        title: "加载中"
      });
      const res = await this.$http.get(`${api}/topic/${id}`, {
        mdrender: false
      });
      wx.hideLoading();
      if (res.data.success) {
        this.detailData = res.data.data;
      } else {
      }
    }
  },
  data() {
    return {
      detailData: {}
    };
  }
};
</script>

<style scoped>
.container {
  padding: 30rpx;
}
.author {
  color: rgb(65, 184, 131);
}
.author-img {
  width: 64rpx;
  height: 64rpx;
}
</style>
