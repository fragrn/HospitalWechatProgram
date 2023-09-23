
var app = getApp()//获取url
Page({
  data: {
    img_arr: [],
    title: '',
    detail:'',
  },
  handleFruitChange({ detail = {} }) {
    this.setData({
        current: detail.value
    });
},
  formSubmit: function (e) {
    this.upload(e)
  },
/**
 * 问题：
 *一张图片上传
 */
  upload: function (e) {
    var that = this
if(that.data.img_arr[0]==null)//当用户不发图时
{
    wx.cloud.database().collection('post_set').add({
      data:{
        title: e.detail.value.title,
        content:e.detail.value.content,
        pic_1 : null,
        time: new Date().toLocaleString(),
        writer: app.globalData.openid,
        writer_info : app.globalData.userInfo,
        
      }, 
      success: function (res) {         
         if (res) {
        wx.showToast({
          title: '已提交至管理员审核，请耐心等待！',
          duration: 3000
        });
        setTimeout(() => {
           wx.switchTab({
          url: '/pages/healthclass/healthclass',
          })
        }, 1000);//发完贴1秒自动跳转到帖子列表页
       
      }} 
    }
  )
}
else{//当用户发图时

  let flag = true 
  var pic_list = []
    
    for (var i = 0; i < (this.data.img_arr.length); i++) {
     console.log(that.data.img_arr[0])
     wx.cloud.uploadFile({
       cloudPath: "post/"+new Date().getTime()+'.png',
       filePath:this.data.img_arr[i],
       success: res => {
        wx.cloud.getTempFileURL({
          fileList:[res.fileID],
          success(res)
          {
            console.log(res)
            pic_list.push(res.fileList[0].tempFileURL)
            console.log(pic_list[0])
          }
        })
      },
      fail: err => {
        console.log("cloud upload error !")
        flag = false
        // handle error
      }
        
      })
    that.setData({
      formdata: ''
    })
  }

 
  setTimeout(() => {
  if(flag)
  {
    console.log(pic_list[0])
    wx.cloud.database().collection('post_set').add({
      data:{
        title: e.detail.value.title,
        content:e.detail.value.content,
        pic_1 : pic_list[0],
        time: new Date().toLocaleString(),
        writer: app.globalData.openid,
        writer_info : app.globalData.userInfo,
       
  },
  success: function (res) {         
    if (res) {
   wx.showToast({
     title: '已提交至管理员审核，请耐心等待！',
     duration: 3000
   });
   setTimeout(() => {
      wx.switchTab({
     url: '/pages/healthclass/healthclass',
     })
   }, 1000);
    }
  }
})
}
    },2000);
  }
},

  upimg: function () {
    var that = this;
    if (this.data.img_arr.length  < 1) {
      wx.chooseImage({//选择图片
        count:3,//一张图片
        sourceType:['album','camera'],
        sizeType: ['original', 'compressed'],
        success: function (res) {
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths)
          })
        }
      })
    
    } 

  },

  onLoad: function() {
  
  },

}



);

