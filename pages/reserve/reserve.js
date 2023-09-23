const dayjs = require("dayjs")

// pages/reserve/reserve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    department:"",
    date:dayjs().format('YYYY-MM-DD'),
    time_1:"8:00~11:00"
  },

  submitDate(e)
  {
    console.log(e.detail.date_msg)
    this.setData({
      date:e.detail.date_msg
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      department:options.selectRightName,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})