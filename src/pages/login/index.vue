<template>
  <div class="container">
    <input class='input' type="text" v-model='accesstoken' placeholder='请输入accesstoken'>
    <button class='button' :disabled='!accesstoken.length' @click.stop="login">登录</button>
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
<style scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button{
  width:600rpx;
}
.input{
  border-bottom: 2rpx solid #888;
  width:600rpx;
}
</style>
