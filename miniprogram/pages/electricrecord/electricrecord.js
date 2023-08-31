//index.js
const db=wx.cloud.database()
const app = getApp()
var tempfile_Paths=[];
var cloud_Paths=[];
let globalOpenID; // 声明全局变量
Page({
  data: {
    tempPaths: [],
    cloudPaths:[],
    fileList:[],        //存储cloud_fileId
    imageUrlList: [],   // 存储temp_fileId
    hideImages_toupload: false, // 初始状态下显示图片
    hideImages_todownload: true   
  },

  uploadimage() {
    
    for(let i=0;i<cloud_Paths.length;i++) {
      wx.cloud.uploadFile({
        cloudPath: cloud_Paths[i],
        filePath: tempfile_Paths[i],

        success: (res) => {
          // 设置hideImages为true，隐藏显示的图片
          this.setData({
            hideImages_toupload: true
          });
          db.collection('Cloud_File_Id').add({
            // data 字段表示需新增的 JSON 数据
            data: {
             file_ID:cloud_Paths[i]
            },
            success: function(res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res)
            }
          })
          console.log('Upload success');
          console.log(res.fileID);
          wx.showToast({
            title: '图片上传成功',
            icon:'success',
            duration: 2000
          })
        },
        fail: (err) => {
          console.log('Upload failed');
          console.log(err);
          wx.showToast({
            title: '图片上传失败',
            icon :  'error',
            duration:2000
          })
        }
      });
    }
  },

  chooseimage: function (e) {
    wx.chooseImage({
      count: 20, // 最多可选择 20 张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({tempPaths:res.tempFilePaths});
        tempfile_Paths = res.tempFilePaths;
        console.log("tempFilePaths: ", tempfile_Paths);
        const currentTime = new Date().getTime(); // 获取当前时间戳
        for (let i = 0; i < tempfile_Paths.length; i++) {
          const filePath = tempfile_Paths[i];
          cloud_Paths.push('Electronic_Medical_Records/'+'MedicalRecords-' + currentTime + '-' + i + filePath.match(/\.[^.]+?$/)[0]);
          console.log('cloudPath: ', cloud_Paths[i]);   
        }
        this.setData({cloudPaths:res.cloud_Paths});
      },
      fail: function (err) {
        console.log('Choose image failed');
        console.log(err);
      }
    });
  },
  
  

  showimage: function () {
    const that = this;
    console.log('111');
    console.log("global\n" + globalOpenID);

    db.collection('Cloud_File_Id').where({
      _openid: globalOpenID
    }).get({
      success: function (res) {
        console.log(res.data);
        const fileList = res.data.map(item => item.file_ID);
        console.log("fileList\n" + fileList);
        that.setData({
          fileList: fileList // 将 fileList 更新为获取到的数据
        }, () => {
          console.log('Updated fileList\n' + that.data.fileList);

          // 假设你已经从数据库中获取了所有图片的文件 ID，存储在一个数组中
          const imageUrlList = [];

          fileList.forEach(fileID => {
            wx.cloud.getTempFileURL({
              fileList: [fileID],
              success: res => {
                that.setData({
                  hideImages_todownload: false
                });
                const tempFileURL = res.fileList[0].tempFileURL;
                console.log("tempFileURL: "+tempFileURL)
                imageUrlList.push(tempFileURL);
                console.log("imageUrlList: "+imageUrlList)
                if (imageUrlList.length === fileList.length) {
                  that.setData({
                    tempPaths: imageUrlList
                  },()=>{
                    console.log("tempPaths: "+that.data.tempPaths)
                  });
                }
              },
              fail: err => {
                console.error(err);
              }
            });
          });
        });
      },
      fail: function (err) {
        console.error('获取 file_ID 列表失败', err);
      }
    });
  },

  // 处理图片操作：下载或删除
  handleImageAction: function (e) {
    const that = this;
    const imageUrl = e.currentTarget.dataset.url;
    wx.showActionSheet({
      itemList: ['下载', '删除'],
      success: function (res) {
        if (res.tapIndex === 0) {
          // 下载图片
          that.downloadImage(imageUrl);
        } else if (res.tapIndex === 1) {
          // 删除图片
          that.deleteImage(imageUrl);
        }
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    });
  },

  deleteImage: function (imageUrl) {
    const that = this;
    
    // Extract the file ID from the imageUrl
    const fileID = imageUrl.split('/').pop();
  
    // Delete the image from Cloud Storage
    wx.cloud.deleteFile({
      fileList: [fileID],
      success: function (res) {
        console.log('Image deleted from Cloud Storage:', res.fileList);
  
        // Show a success toast
        wx.showToast({
          title: '图片删除成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            // Delete was successful, refresh the image list
            that.showimage();
          }
        });
      },
      fail: function (err) {
        console.error('Failed to delete image:', err);
  
        // Show an error toast
        wx.showToast({
          title: '图片删除失败',
          icon: 'error',
          duration: 2000
        });
      }
    });
  },

  downloadImage: function (imageUrl) {
    const that = this;
    wx.downloadFile({
      url: imageUrl,
      success: function (res) {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function () {
              wx.showToast({
                title: '图片保存成功',
                icon: 'success',
                duration: 2000
              });
            },
            fail: function () {
              wx.showToast({
                title: '图片保存失败',
                icon: 'error',
                duration: 2000
              });
            }
          });
        }
      },
      fail: function (err) {
        console.error(err);
      }
    });
  },

  onLoad: function () {
    // 获取当前用户的 OpenID
    wx.cloud.callFunction({
      name: 'getOpenID',
      success: res => {
        globalOpenID = res.result.openid; // 存储为全局变量
        console.log('当前用户的 OpenID:', globalOpenID);
      },
      fail: err => {
        console.error('获取 OpenID 失败', err);
      }
    });
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
});