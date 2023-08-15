//index.js
const app = getApp()

Page({
  data: {
  openid:"",
  imglist:[],
  form:
  {
    ossUrl:[],
  },
  photoold:"",
  photonew:""
  },

  chooseimage:function(e)
  {
    var that = this;
    wx.chooseImage({
      success(res)
      {
        that.setData({
          photoold:res.tempFilePaths[0],
          imglist:res.tempFilePaths,
        })
      }
    })
  },

  uploadimage:function(e){
    var that = this;
    console.log("openid:",that.data.openid);
    console.log("filePath:",that.data.photoold);
    wx.uploadFile({
      filePath: that.data.photoold,
      name: 'file',
      url: '',/* 服务器地址*/
      formData:{
        'myopenid':that.data.myopenid,
      },
      success(res){
        console.log(res.data)
        that.setData({
          photonew:res.data+"?temp="+new Date().getTime()
        })
        wx.showToast({
          title: '图片上传成功',
          icon:'success',
          duration: 2000
        })
      },
      fail(res)
      {
        console.log(res)
        wx.showToast({
          title: '图片上传失败',
          icon :  'error',
          duration:2000
        })
      }
    })
  },

  removeChooseImage(e) {
    let imgs = this.data.form.ossUrl;
    let {index} = e.currentTarget.dataset;
    imgs.splice(index, 1);
    this.setData({
      'form.ossUrl': imgs,
      imagelist: imgs
    })
  },


  onLoad: function(options) {
    this.setData({
      openid :options.myopenid,
    })
  },

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
