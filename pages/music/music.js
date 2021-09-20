// pages/music/music.js
const $api = require('../../utils/api.js').API;
console.log($api)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicData:[],
    asanData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111)
    let data = {type:7}
    $api.getNewMusic(data).then((res)=>{
      console.log(res)
      let recommend = res.data.result;
      //取前6个
      this.setData({
        musicData:recommend.slice(0,6)
      })
    })
    let like = {uid:1389758093}
    //获取喜欢的歌单
    $api.getLikeMusic(like).then((res)=>{
      console.log(res)
      let like = res.data.playlist;
      //取前6个
      this.setData({
        asanData:like.slice(0,6)
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})