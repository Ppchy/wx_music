// method(HTTP 请求方法)，网易云API提供get和post两种请求方式
const app = getApp();
const GET = 'GET';
const POST = 'POST';
// 定义全局常量baseUrl用来存储前缀
const baseURL = 'https://music.ming.net.cn';

function request(method, url, data) {
  return new Promise(function (resolve, reject) {
    let header = {    //定义请求头
      'content-type': 'application/json',
      'cookie': app.globalData.login_token
    };
    wx.request({
      url: baseURL + url,
      method: method,
      data: method === POST ? JSON.stringify(data) : data,
      header: header,
      success(res) {
        //请求成功
        //判断状态码---errCode状态根据后端定义来判断
        if (res.data.code == 200) {  //请求成功
          resolve(res);
        }else {
          //其他异常
          reject('运行时错误,请稍后再试');
        }
      },
      fail(err) {
        //请求失败
        reject(err)
      }
    })
  })
}

const API = {
  // getSongDetail: (data) => request(GET, `/song/detail`, data),  //获取歌曲详情
  // getSongUrl:(data) => request(GET, `/song/url`, data),  //获取歌曲路径
  getNewMusic:(data) => request(GET,'/personalized',data),
  //喜欢的歌单
  getLikeMusic:(data) =>request(GET,'/user/playlist',data),
  //获取歌曲详情
  getDetail:(data)=>request(GET,'/playlist/detail',data),
  //登录
  getLogin:(data)=>request(GET,'/login/cellphone',data),
  //获取验证码登录
  getVerify:(data)=>request(GET,'/captcha/sent',data),
  //获取歌曲详情
  getSongDetail: (data) => request(GET, `/song/detail`, data),  
  //获取歌曲路径
  getSongUrl: (data) => request(GET, `/song/url`, data),  
  //获取歌曲是否可用
  getCheck: (data) => request(GET,'/check/music',data)
};
module.exports = {
  API: API
}