<template>
  <div>
    <img :src="author.avatar_url" alt="头像">
    <span>{{author.loginname}}</span>
    <p>{{content}}</p>
  </div>
</template>

<script>
export default {
  props: {
    author: Object,
    top: Boolean, // top
    title: String,
    reply_count: Number,
    visit_count: Number,
    last_reply_at: String,
    content: String,
    good: Boolean // 精华
  }
};
</script>

<style scoped>

</style>
