
var app = getApp();
Page({

  onPullDownRefresh() {
    this.onShow();
    console.log("上拉刷新");
    wx.showNavigationBarLoading() //在标题栏中显示加载
    
    },
    
  post:function()
  {
    wx.navigateTo({
      url: '../post/post'
    })
  },
  getUserInfo:function(e){
    console.log(e.detail.userInfo)
    wx.request({    
        url: app.globalData.url+'all',  
        data:{
          'writer': e.detail.userInfo.nickName,  
          'pic' : e.detail.userInfo.avatarUrl,
        method: 'POST',  
        header: {
          'content-type': 'application/json'
        },
        success:function(res) {  
          console.log('submit successs');  
        },  
        fail:function(res){  
            console.log('submit fail');  
        }
    }
  })
},
  formSubmit(e) {
        console.log(e.detail.value)
        wx.navigateTo({
          url: '../find/find?find='+e.detail.value.find,//这里是重点！！！页面信息传递，要结合我的上一篇博客看
          })
           
  },
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    title:"",
    writer:" ",
    time:"",
    number:"",
   
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function () {
        var that = this
        wx.cloud.database().collection('post_set').get({

          success: function (res) {
            //将获取到的json数据，存在名字叫list的这个数组中
              console.log(res.data);
              that.setData(
              {
              list: res.data,
              //res代表success函数的事件对，data是固定的，list是数组
            })
          }
        })
     
     
      },
  tempData: function () {
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
    var that = this
    wx.cloud.database().collection('post_set').get({

            success: function (res) {
              //将获取到的json数据，存在名字叫list的这个数组中
                console.log(res.data);
                that.setData(
                {
                list: res.data,
                //res代表success函数的事件对，data是固定的，list是数组
              })
            }
          })
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

