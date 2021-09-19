// pages/music-detail/music-detail.js
const $api = require('../../utils/api.js').API;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid:"",
    playlist: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      pid: options.pid
    })
    this.getPlaylistDetail()
  },
  getPlaylistDetail(){
    let detail = {id:this.data.pid}
    $api.getDetail(detail).then((res) =>{
      this.setData({
        playlist:res.data.playlist
      })
      console.log(res)
    })
  }
})