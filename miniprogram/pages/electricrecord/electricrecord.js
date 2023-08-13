//index.js
const db=wx.cloud.database()
const app = getApp()
var tempfile_Paths=[];
var cloud_Paths=[];

Page({
  data: {
    tempPaths: [],
    cloudPaths:[]
  },

  uploadimage()
  {
    for(let i=0;i<cloud_Paths.length;i++)
    {
      wx.cloud.uploadFile({
        cloudPath: cloud_Paths[i],
        filePath: tempfile_Paths[i],
  
        success: (res) => {
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

  chooseimage: function (e) 
  {
    wx.chooseImage
    ({
      count: 20, // 最多可选择 20 张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res) =>
      {
        this.setData({tempPaths:res.tempFilePaths});
        tempfile_Paths = res.tempFilePaths;
        console.log("tempFilePaths: ", tempfile_Paths);
        const currentTime = new Date().getTime(); // 获取当前时间戳
        for (let i = 0; i < tempfile_Paths.length; i++) {
          const filePath = tempfile_Paths[i];
          cloud_Paths.push( 'Electronic_Medical_Records/'+'MedicalRecords-' + currentTime + '-' + i + filePath.match(/\.[^.]+?$/)[0])
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
  
    // 假设你已经从数据库中获取了所有图片的文件 ID，存储在一个数组中
        const fileList=
    [
      'cloud://huashi-1gkmmhqq303afcae.6875-huashi-1gkmmhqq303afcae-1316757497/Electronic_Medical_Records/MedicalRecords-1691912625753-0.jpg',
      'cloud://huashi-1gkmmhqq303afcae.6875-huashi-1gkmmhqq303afcae-1316757497/Electronic_Medical_Records/MedicalRecords-1691912625753-1.jpg',
      'cloud://huashi-1gkmmhqq303afcae.6875-huashi-1gkmmhqq303afcae-1316757497/Electronic_Medical_Records/MedicalRecords-1691912625753-2.png',
      'cloud://huashi-1gkmmhqq303afcae.6875-huashi-1gkmmhqq303afcae-1316757497/Electronic_Medical_Records/MedicalRecords-1691912625753-3.png'
      // 添加更多文件 ID
    ];
  
    const imageUrlList = [];
  
    fileList.forEach(fileID => {
      wx.cloud.getTempFileURL({
        fileList: [fileID],
        success: res => {
          const tempFileURL = res.fileList[0].tempFileURL;
          imageUrlList.push(tempFileURL);
  
          if (imageUrlList.length === fileList.length) {
            // 在获取图片链接后，构建图片列表的 HTML 字符串
            const imageItems = imageUrlList.map((url, index) => `<img src="${url}" data-index="${index}" style="width: 33.33%;" />`).join('');
  
            // 弹出模态对话框，显示图片列表
            wx.showModal({
              title: '选择下载图片',
              content: `<div style="display: flex; flex-wrap: wrap;">${imageItems}</div>`,
              showCancel: false,
              confirmText: '下载',
              confirmColor: '#3CC51F',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击下载按钮');
                  // 这里可以添加下载逻辑
                }
              }
            });
          }
        },
        fail: err => {
          console.error(err);
        }
      });
    });
  },

  // showimage: function () {
  //   const that = this;
  
  //   // 假设你已经从数据库中获取了所有图片的文件 ID，存储在一个数组中
  //   //const fileList = that.data.cloud_Paths;

  //   const fileList=
  //   [
  //     'cloud://huashi-1gkmmhqq303afcae.6875-huashi-1gkmmhqq303afcae-1316757497/Electronic_Medical_Records/MedicalRecords-1691912625753-0.jpg',
  //     'cloud://huashi-1gkmmhqq303afcae.6875-huashi-1gkmmhqq303afcae-1316757497/Electronic_Medical_Records/MedicalRecords-1691912625753-1.jpg',
  //     'cloud://huashi-1gkmmhqq303afcae.6875-huashi-1gkmmhqq303afcae-1316757497/Electronic_Medical_Records/MedicalRecords-1691912625753-2.png',
  //     'cloud://huashi-1gkmmhqq303afcae.6875-huashi-1gkmmhqq303afcae-1316757497/Electronic_Medical_Records/MedicalRecords-1691912625753-3.png'
  //     // 添加更多文件 ID
  //   ];
  
  //   const imageUrlList = [];
  
  //   fileList.forEach(fileID => {
  //     wx.cloud.getTempFileURL({
  //       fileList: [fileID],
  //       success: res => {
  //         const tempFileURL = res.fileList[0].tempFileURL;
  //         imageUrlList.push(tempFileURL);
  
  //         if (imageUrlList.length === fileList.length) {
  //           that.setData({
  //             tempPaths: imageUrlList
  //           });
  
  //           // 在获取图片链接后，弹出一个对话框供用户选择下载的图片
  //           wx.showActionSheet({
  //             itemList: imageUrlList.map((url, index) => `图片 ${index + 1}`),
  //             success: function (res) {
  //               const selectedImageUrl = imageUrlList[res.tapIndex];
  //               that.downloadImage(selectedImageUrl);
  //             },
  //             fail: function (res) {
  //               console.log(res.errMsg);
  //             }
  //           });
  //         }
  //       },
  //       fail: err => {
  //         console.error(err);
  //       }
  //     });
  //   });
  // },
  
  // downloadImage: function (imageUrl) {
  //   wx.downloadFile({
  //     url: imageUrl,
  //     success: function (res) {
  //       if (res.statusCode === 200) {
  //         wx.saveImageToPhotosAlbum({
  //           filePath: res.tempFilePath,
  //           success: function () {
  //             wx.showToast({
  //               title: '图片保存成功',
  //               icon: 'success',
  //               duration: 2000
  //             });
  //           },
  //           fail: function () {
  //             wx.showToast({
  //               title: '图片保存失败',
  //               icon: 'error',
  //               duration: 2000
  //             });
  //           }
  //         });
  //       }
  //     },
  //     fail: function (err) {
  //       console.error(err);
  //     }
  //   });
  // },

  onLoad: function () {
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