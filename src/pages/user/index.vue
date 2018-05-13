<template>
  <div class='container'>
    <authorHead :user='user'></authorHead>
     <div class='body'>
       <div class='tabs'>
         <div :class='{selected:tab==="reply"}' @click.stop='changeTab($event)' data-tab='reply'>最近回复</div>
         <div :class='{selected:tab==="topics"}' @click.stop='changeTab($event)' data-tab='topics'>最近主题</div>
       </div>
       <div>
        <div v-for='item in currentData' :key='item.id' :data-id='item.id'>
          <card :item='item' :hidden='true'></card>
        </div>
       </div>
     </div>
  </div>
</template>
<script>
import authorHead from "../../components/authorHead";
import { api } from "../../const";
import card from "../../components/card";
export default {
  components: {
    card,
    authorHead
  },
  data() {
    return {
      user: {},
      reply: [],
      topics: [],
      tab: "reply" // topics
    };
  },
  computed: {
    currentData() {
      return this.tab === "reply" ? this.reply : this.topics;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    changeTab(e) {
      this.tab = e.target.dataset.tab;
    },
    async getData() {
      const loginname = this.$root.$mp.query.loginname;
      if (loginname) {
        const res = await this.$http.get(`${api}/user/${loginname}`);
        if (res.data.success) {
          this.user = res.data.data;
          this.reply = res.data.data.recent_replies;
          this.topics = res.data.data.recent_topics;
        }
      }
    }
  }
};
</script>

<style scoped>
.container {
  background-color: rgb(245, 245, 249);
}
.body {
  display: flex;
  flex-direction: column;
}
.tabs{
  display:flex;
  background-color: white;
}
.tabs > div {
  width: 50%;
  text-align: center;
}
.selected {
  color: #41b883;
  border-bottom: 2rpx solid #41b883;
}
</style>

