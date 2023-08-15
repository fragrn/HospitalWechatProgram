// pages/personal/personal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sickName:"         李小明",
    sickId:"        10215521379",
    sickCard:"214993188323",
    show:"show"
  },
  //健康档案
  healthdocument:function(){
    wx.navigateTo({
      url: '/pages/healthdocs/healthdocs'
    })
  },
  //住院缴费记录查询 | 我的票据
  registerLog: function (e) {
    wx.navigateTo({
      url: '/pages/registerLog/registerLog?type=' + e.currentTarget.dataset.type
    })
  },
  //挂号记录
  register_record:function(){
    wx.navigateTo({
      url: '/pages/register_record/register_record'
    })
  },
  //发帖记录
  mypost:function(){
    wx.switchTab({
      url: '/pages/healthclass/healthclass'
    })
  },

  addVisitCard: function () {
    app.addVisitCard()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (app.globalData.sickName == ""){
      that.setData({
        show:"show"
      })
    }else{
      that.setData({
        sickName: app.globalData.sickName,
        sickCard: app.globalData.sickCard,
        show: "hidden"
      })
    }
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