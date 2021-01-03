const BASE_API_URL = 'https://api.daily.luanrz.cn'

App({
  onLaunch: function () {
    login()
  }
})

/**
 * 登录
 */
function login(){
  var login_url = BASE_API_URL + '/user/login/wechat'
  wx.login({
    success: res => {
      console.log(res)
      wx.request({
        url: login_url,
        method: 'POST',
        data: {
          wechatCode: res.code
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res =>{
          console.log(res)
          var userData = {
            userId : res.data.userId,
            username: res.data.username,
            jwt: res.header.jwt
          }
          wx.setStorage({
            data: userData,
            key: 'userData',
          })
          getTasks(userData.jwt)
        } 
      })
    }
  })  
}

/**
 * 准备待办事项数据
 */
function getTasks(jwt){
  var get_tasks_url = BASE_API_URL + "/task/all"
  wx.request({
    url: get_tasks_url,
    method: 'GET',
    header: {jwt: jwt},
    success: res => {
      console.log(res)
      wx.setStorage({
        data: res.data,
        key: 'tasks',
      })
      if(getApp().taskReadyCallback){
        getApp().taskReadyCallback(res.data)
      }
    }
  })
}
