// pages/music-detail/music-detail.js
const $api = require('../../utils/api.js').API;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid:"",
    playlist: {},
    coverList:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pid: options.pid
    })
    this.getPlaylistDetail()
  },
  getPlaylistDetail(){
    let detail = {id:this.data.pid}
    $api.getDetail(detail).then((res) =>{
      console.log(res)
      this.setData({
        playlist:res.data.playlist.tracks,
        coverList:res.data.playlist
      })
    })
  },
  gotoSong(event){
    let mId = event.currentTarget.dataset.id;
    //检查歌曲是否有版权
    wx.request({
      url: 'https://music.ming.net.cn/check/music',
      data:{ id: mId},
      success:(res)=>{
        console.log(res)
        if(res.data.success){
          wx.navigateTo({
            url: '/pages/play/play?mid='+mId,
          })
        }else{
          wx.showModal({
            title: '提示',
            content: '亲，暂无版权哟',
            showCancel:false
          })
        }
      }
    })
   
    
  },
  onReachBottom:function(){
    let detail = {id:this.data.pid}
    $api.getDetail(detail).then((res) =>{
      let playlists = this.data.playlist
      console.log(res.data.playlist.tracks)
      playlists.push(...res.data.playlist.tracks);
    })
    
  },
  playAll() {
    let playlist = this.data.playlist
    let musicId = playlist[0].id;
    for (let i = 1; i < playlist.length; i++) {
      app.globalData.waitForPlaying.push(playlist[i].id)
    }
    // 跳转到播放页面
    wx.navigateTo({
      url: '/pages/play/play?mid='+musicId,
    })
  },
})