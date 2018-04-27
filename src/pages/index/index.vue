<template>
  <div class='container'>
    <div class='header'>
      <div @click.stop='getData($event)' data-tab='all'>全部</div>
      <div @click.stop='getData($event)' data-tab='good'>精华</div>
      <div @click.stop='getData($event)' data-tab='share'>分享</div>
      <div @click.stop='getData($event)' data-tab='job'>招聘</div>
      <div @click.stop='getData($event)' data-tab='ask'>问答</div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card';

export default {
  data() {
    return {
      page: 1,
      tab:'all'
    };
  },

  components: {},
  watch = {

  },
  methods: {
    getData(e) {
      console.log(e.target.dataset);
      // this.$http
      //   .get('https://cnodejs.org/api/v1/topics ')
      //   .then(d => {
      //     //输出请求数据
      //     console.log(d.data);
      //     console.log(d.header);
      //   })
      //   .catch(err => {
      //     console.log(err.status, err.message);
      //   });
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
}
.header > div {
  width: 20%;
  background-color: rgb(58, 64, 245);
  color: white;
  text-align: center;
  height: 86rpx;
  line-height: 86rpx;
}
</style>

