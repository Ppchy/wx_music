// pages/login/index.js
const $api = require('../../utils/api.js').API;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    verify:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.verification()   //验证是否登陆
  },
  verification(){
    let login_token = wx.getStorageSync("login_token")
    // if (login_token == '') {
    //   this.tips('未登录,请登陆后尝试！', '去登陆', true, '/pages/login/login')
    // } else {
    //   // 从全局中取数据
    //   wx.navigateTo({
    //     url: '/pages/music/music',
    //   })
    // }
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //获取验证码
  getVerify:function(){

    console.log(this.data.phone)
  },
  //登录
  loginSubmit:function(data){
    let phone = data.detail.value.phone
    let verify = data.detail.value.verify;
    let loginData = {
      phone:phone,
      captcha:verify
    }
    /**发送验证码验证 */

    $api.getLogin(loginData).then((res)=>{
      console.log(res)
      if(res.data.code == 200){
        wx.setStorageSync("userId", res.data.account.id);
        app.globalData.userId = res.data.account.id;  //将用户id传给全局中
        // 保存cookie登陆信息到Storage
        console.log(res.cookies)
        this.saveUserLoginInfo(res.cookies)
          wx.navigateTo({
            url: '/pages/music/music',
          })
      }
    })
  },
  // 保存用户登陆凭证方法
  saveUserLoginInfo: function (cookies) {
    // console.log(cookies)
    for (let i = 0; i < cookies.length; i++) {
      //判断当前项前缀是否是 "MUSIC_U="
      if (cookies[i].search("MUSIC_U=") != -1) {
        //找到了之后，保存到本地
        wx.setStorageSync("login_token", cookies[i]);
      console.log(wx.getStorageSync("login_token"));
        app.globalData.login_token = cookies[i];
      }
    }
  },
})