<template>
  <div class="container">
    <login :visible='visible' v-on:modalClose='closeModalEvent'></login>
    <authorHead :user='user'></authorHead>
    <div class='body'>
      <navigator class='list-item margin' @click.stop='setListFrom' url='/pages/list/main' data-item='topic'>最近话题</navigator>
      <navigator class='list-item' @click.stop='setListFrom' url='/pages/list/main' data-item='reply'>最近回复</navigator>
      <div class='list-item' @click='logout'>登出</div>
    </div>
  </div>
</template>

<script>
import { getURL } from "../../utils/index";
import authorHead from "../../components/authorHead";
import login from "../../components/login";
import { api } from "../../const";
export default {
  data() {
    return {
      visible: false,
      user: {}
    };
  },
  components: {
    authorHead,
    login
  },
  methods: {
    logout(){
      wx.clearStorageSync('accesstoken');
      wx.clearStorageSync('me');
      this.visible = true;
    },
    setListFrom(e){
      // e.target.dataset.item
      wx.setStorageSync('fromItem',e.target.dataset.item)
    },
    closeModalEvent() {
      this.visible = false;
      this.getData();
    },
    async getData() {
      const me = wx.getStorageSync("me");
      if (me) {
        const res = await this.$http.get(`${api}/user/${me}`);
        if (res.data.success) {
          this.user = res.data.data;
        }
      } else {
        console.log("no me");
      }
    }
  },
  mounted() {
    const accesstoken = wx.getStorageSync("accesstoken");
    if (!accesstoken) {
      this.visible = true;
    } else {
      this.getData();
    }
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: rgb(245, 245, 249);
}
.body {
  margin-top: 30rpx;
  background-color: white;
}
.list-item {
  height: 76rpx;
  line-height: 76rpx;
  margin: 0 30rpx;
  padding: 10rpx 0;
}
.margin {
  margin-top: 30rpx;
}
.list-item + .list-item {
  border-top: 2rpx solid #888;
}
</style>
