
var app = getApp();
Page({

 
    
  post:function()
  {
    wx.navigateTo({
      url: '../post/post'
    })
  },
 
  formSubmit(e) {
        console.log(e.detail.value)
        wx.navigateTo({
          url: '../find/find?find='+e.detail.value.find,//这里是重点！！！页面信息传递，要结合我的上一篇博客看
          });
          this.setData({
            keywords:""
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
    commentNumber: 0,
    keywords: ""

   
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
              var len = count_len(res.data)
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
    console.log("下拉刷新")
    setTimeout(()=>{
      wx.showNavigationBarLoading();
      wx.switchTab({
        url: '/pages/healthclass/healthclass',
        success : function(res)
        {
          wx.stopPullDownRefresh({
            success(res)
            {
              console.log('刷新成功！');
            }
          })
        }
      })
    },1000)
  
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

function count_len(obj)
{
  var len = 0;
  for ( var i in obj)
  {
    len = len +1 ;
  }

  return len;
}

