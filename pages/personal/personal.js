// pages/personal/personal.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_icon:"",
    sickName: "",
    sickId:"",
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
    wx.navigateTo({
      url: '/pages/mypost/mypost'
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
   
    if (app.globalData.userInfo == null){
      that.setData({
        show:"show"
      })
    }else{
      that.setData({
        user_icon:app.globalData.userInfo.avatarUrl,
        sickName:app.globalData.userInfo.nickName,
        sickId:app.globalData.student_id,
        show: "show"
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