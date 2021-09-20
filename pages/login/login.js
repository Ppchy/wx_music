// pages/login/index.js
const $api = require('../../utils/api.js').API;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    verify:"",
    countdown:60,
    canClick:false,
    btnValue:"发送验证码"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.verification()   //验证是否登陆
  },
  verification(){
    let login_token = wx.getStorageSync("login_token")
    if (login_token == '') {
      // wx.navigateTo({
      //   url: '/pages/login/login',
      // })
      // this.tips('未登录,请登陆后尝试！', '去登陆', true, '/pages/login/login')
    } else {
      // 从全局中取数据
      wx.navigateTo({
        url: '/pages/music/music',
      })
    }
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //获取验证码
  getVerify:function(event){
    const phone = this.data.phone;
   
    var that = this;
    console.log(event)
    if(phone){
        $api.getVerify({phone:phone}).then((res)=>{
          console.log(res)
          if(res){
            //如果发送成功进行倒计时
            that.setTime()
          }
        })
    }else{
      wx.showToast({
        title: '手机号不能为空',
      })
    }
  },
  //验证码倒计时实现
  setTime:function() {
      if (this.data.countdown == 0) {
          this.setData({
            countdown: 60,
            btnValue: "发送验证码",
            canClick: false
          })
          return;
      } else {
        let countdown = this.data.countdown -1;
        this.setData({
          countdown: countdown,
          btnValue: countdown+'秒',
          canClick: true
        })
      }
      setTimeout(()=>{
        this.setTime()
      },1000)
  },
  //登录
  loginSubmit:function(data){
    let phone = data.detail.value.phone
    let verify = data.detail.value.verify;
    let loginData = {
      phone:phone,
      captcha:verify
    }

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