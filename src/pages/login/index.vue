<template>
  <div class="container">
    <input type="text" v-model='accesstoken'>
    <button @click.stop="login">登录</button>
    <div @click.stop='back'>X</div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      accesstoken:''
    }
  },
  methods:{
    login(){

    },
    back(){
      const from = wx.getStorageSync('from');

    }
  },
  config: {
    navigationBarTitleText: '登录'
  }
}
</script>
