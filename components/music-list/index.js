// components/music-list/music-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    musics:Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    detail_id:null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToDetail:function(event){
      const id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/music-detail/music-detail?pid='+id,
      })
    }
  }
})
