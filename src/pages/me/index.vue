<template>
  <div class="counter-warp">
    sss
  </div>
</template>
<script>
import {getURL} from '../../utils/index';
export default {
mounted(){
  const accesstoken = wx.getStorageSync('accesstoken');
  if (!accesstoken){
    wx.setStorageSync('from',getURL());
    wx.redirectTo({url:'../login/main'});
  }
}
}
</script>
