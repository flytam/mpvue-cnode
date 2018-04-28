import Vue from 'vue'
import App from './App'
import flyio from 'flyio/dist/npm/wx'
Vue.prototype.$http = new flyio
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/detail/main', '^pages/index/main','pages/publish/main','pages/me/main','pages/notice/main','pages/user/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'cNode',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      selectedColor: '#41b883',
      list: [{
        pagePath: 'pages/index/main',
        text: '首页',
        iconPath:'./static/home.png',
        selectedIconPath:'./static/home.png'
      }, {
        pagePath: 'pages/notice/main',
        text: '通知',
        iconPath:'./static/notice-o.png',
        selectedIconPath:'./static/notice-o.png'
      }, {
        pagePath: 'pages/publish/main',
        text: '发帖',
        iconPath:'./static/edit.png',
        selectedIconPath:'./static/edit.png'
      }, {
        pagePath: 'pages/me/main',
        text: '我',
        iconPath:'./static/user-o.png',
        selectedIconPath:'./static/user-o.png'
      }]
    },
  }
}
