//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '知乎--微信小程序版',
    userInfo: {}
  },
  //事件处理函数
  bindAnswer1Tap: function() {
    wx.navigateTo({
      url: '../answer1/answer1'
    })
  },
  bindAnswer1_2Tap: function() {
    wx.navigateTo({
      url: '../answer1_2/answer1_2'
    })
  },
  bindAnswer1_3Tap: function() {
    wx.navigateTo({
      url: '../answer1_3/answer1_3'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  tapName: function(event){
    console.log(event)
  }
})
