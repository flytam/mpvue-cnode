<template>
  <div class='container'>
    <div class='head'>
      <img class='head-img' :src="item.author.avatar_url" alt="头像">
      <div class='info'>
      <span>{{item.author.loginname}}</span>
      <span>{{item.create_at}}</span>
      </div>
    </div>
    <div class='body'>
      <p>{{item.title}}</p>
    </div>
    <div class='foot'>
      <div class="count">
        <span class='number'>回答数：{{item.reply_count}}</span>
        <span class='number'>浏览数：{{item.visit_count}}</span>
      </div>
      <div class="later">
        <span class='number'>最新动态：{{item.last_reply_at}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>

<style scoped>
.container {
  height: 330rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.head {
  color: rgb(65, 184, 131);
  display: flex;
}
.head-img {
  width: 64rpx;
  height: 64rpx;
}
.info{
  flex-direction: column;
  display: flex;
}
.body {
  color: rgb(65, 184, 131);
}
.number {
  color: #888;
  font-size: 26rpx;
}
</style>
