
var app = getApp();//获取url
Page({  

  formSubmit(e) 
  {
    var that = this; 
   
    if(e.detail.value.pinglun==null||e.detail.value.pinglun=='')
    {
        wx.showToast({
          title: '评论内容不能为空',
          duration: 2000
        })
   }
   else{
   wx.cloud.database().collection('comment_set').add({
    data: {
        content : e.detail.value.pinglun,
        post_id : that.data.post_id,
        time :  new Date().toLocaleString(),
        writer: app.globalData.openid,
        writer_info : app.globalData.userInfo,
    },
   
     success: function (res) {

      wx.showToast({
        title: '评论成功！',
        duration: 2000
      });

      that.setData({
        CommentValue : ""
      })


  // if (getCurrentPages().length != 0) {
  //   //刷新当前页面的数据
  //   getCurrentPages()[getCurrentPages().length - 1].onLoad()
  // }
  }
})
   }
    
}
  ,
  
  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    name:"",
    time:"",
    CommentValue:"",
    detail:"",
    listPL:[],
    post_id:"",
    nickName:"",
    list : [],
    
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      post_id:options.id
    })
 
  var that = this
    wx.cloud.database().collection('post_set').where({
      _id : that.data.post_id
    })
    .get({

    success:function(res) {  
      console.log(res.data)
  
        that.setData({
           list: res.data,//主贴内容
        })

        
    },  
    fail:function(res){  
        console.log('submit fail');  
    }  
})


  wx.cloud.database().collection('comment_set').where({
    post_id : that.data.post_id
  }).get({
    success:function(res){
      console.log(res.data)
      that.setData({
        listPL: res.data
      })
    },
    fail :function(res)
    {
      console.log('Getting Comment fail!')
    }
  })
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
    wx.cloud.database().collection('comment_set').where({
      post_id : that.data.post_id
    }).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          listPL: res.data
        })
      },
      fail :function(res)
      {
        console.log('Getting Comment fail!')
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
    console.log("上拉刷新")
    wx.showNavigationBarLoading();
    this.setData({
      listPL : []
    }),
    this.onShow();

  
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
