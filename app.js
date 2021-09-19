// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    userId: 0,
    waitForPlaying: [],//等待播放歌单
    history_songId: [],//历史歌单
    songName: '',//歌名
    musicId: -1,//音乐id
    backgroundAudioManager: {},
    login_token: '',
    navId: 2
  }
})
