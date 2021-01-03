//获取应用实例
const app = getApp()

Page({
  data: {
    tasks: []
  },
  onLoad: function (options) {
    app.taskReadyCallback = res => {
      console.log(res)
      this.setData({
        'tasks': res
      })
    }
  }
})