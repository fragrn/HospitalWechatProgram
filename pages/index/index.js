//index.js
//获取应用实例
const app = getApp()
let id = ''
let passwds ='' 
Page({
  data: {
    motto: '',
    id : '' ,
    passwds:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    //this.gotoMain();

  
  },

  id_num(e)
  {
    id = e.detail.value
  },
  password(e)
  {
    passwds = e.detail.value
  },

  login()
  {
    let pass = false
    if(id == '')
    {
      wx.showToast({
        title: '账号不能为空',
        icon: 'none',
      })
    } 
    else if(passwds == '')
    {
      wx.showToast({
        title: '密码不能为空',
        icon:'none',
      })
    }
else{
  wx.cloud.database().collection('login_db')
  .get({
    success:(res)=>{
      console.log(res.data)
      let set = res.data
      for(let i = 0 ; i< set.length ; i++ )
      {
        if(id === set[i].id)
        {
          pass = true
          if(passwds!= set[i].passwd)
          {
            wx.showToast({
              title: '密码错误!',
              icon:'error',
              duration: 2500
            });
            break;
          }
          else{
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2500
            })
           pass = true
          app.globalData.student_id = id
           wx.setStorageSync('login_db', passwds)
            wx.switchTab({
              url: '/pages/home/home',
            })
           break;
          }
        }
      };
      if(pass == false)
      {
        wx.showToast({
          title: '用户不存在',
          icon:'error',
          duration:2500
        })
      }
    }
  })
}

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  gotoMain: function () {
    wx.switchTab({
      url: '../home/home'
    })
  },
  regist : function()
  {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  }
})
