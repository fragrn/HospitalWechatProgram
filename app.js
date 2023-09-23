//app.js
const urlApi = require('./utils/server.api.js')
var app = getApp();
App({
  
  onLaunch: function () {
    // 展示本地存储能力
    wx.cloud.init({
      env:'project-4gz9hqn3031f5a54'
    })
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: "wx676dc7fc17f01892",
            secret:"e4e60e136c6cb255e7c65819b91e30d7",
            js_code: res.code,
            grant_type:'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log("openId获取成功", res.data.openid)
            that.globalData.openid = res.data.openid;
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }

              var avatarUrl = that.globalData.userInfo.avatarUrl
              console.log(avatarUrl)
              wx.downloadFile({
                url: avatarUrl,
                success (res) {
                 if (res.statusCode === 200) {
                wx.hideLoading()
                let tempFilePath = res.tempFilePath
                wx.saveFile({
                  tempFilePath,
                  success (res) {
                         // 可以进行到这里
                      console.log(res);
                     const savedFilePath = res.savedFilePath
                      wx.cloud.uploadFile({
                        cloudPath:"icon/"+that.globalData.openid+".png",
                        filePath: savedFilePath,
                        success :res =>
                        {
                          wx.cloud.getTempFileURL({
                            fileList:[res.fileID],
                            success(res)
                            {
                              console.log(res.fileList[0].tempFileURL)
                              that.globalData.userInfo.avatarUrl = res.fileList[0].tempFileURL

                              console.log("用户信息",that.globalData.userInfo)
                              
                            }
                          })
                        }
                      })

                  },
                  fail (err) {
                   console.log(err);
                 
                  }
                 })
                }
               }
              })  
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    openid: "",
    student_id:"",
  },
  //添加就诊卡
  addVisitCard() {
    wx.navigateTo({
      url: '../addcard/addcard',
    })
  },
  //添加住院人
  addResident() {
    wx.navigateTo({
      url: '../addresident/addresident',
    })
  }
})