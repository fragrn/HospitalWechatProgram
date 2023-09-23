// pages/register/register.js
var app = getApp();
let id = ''
let password_1 ='' 
let password_2 = ''
Page({


  /**
   * 页面的初始数据
   */
  data: {
  passwd_2 : ''

  },

  id_num(e)
  {
    id = e.detail.value
  },
  password_1(e)
  {
    password_1 = e.detail.value
  },
  password_2(e)
  {
    password_2=e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  regist:function()
  {
    var that = this
    if(id== '')
    {
      wx.showToast({
        title: '学号不能为空',
        icon: 'none',
      })
    }
    else if(password_1 == '' || password_2=='')
    {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
      })
    }
    else{
      if(password_1 != password_2)
      {
        wx.showToast({
          title: '密码确认失败，请重新输入',
          icon: 'none',
        })
         that.setData({
            passwd_2:'',
         })
      }
      else{
        wx.cloud.database().collection('login_db').add({
          data:{
            id : id,
            passwd:password_1,
            openid: app.globalData.openid,
          },
         success:res=>{
           wx.showToast({
             title: '注册成功！',
           })

          wx.navigateTo({
            url: '/pages/index/index',
          })
         },
         fail:res=>{
           console.log(res)
           wx.showToast({
             title: '该用户已存在',
             
           })
         }
        })
      }
    }
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