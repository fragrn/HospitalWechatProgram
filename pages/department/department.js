// js
// 假数据
let List = [
	{
		"LeftId": 1,
		"LeftName": "内科",
		"RightList": [
		{
			"RightId": 11,
			"RightName": "普通内科"
    },
    {
      "RightId": 12,
			"RightName": "慢性病门诊"
    },
    {
      "RightId": 13,
			"RightName": "消化内科"
    },
    {
      "RightId": 14,
			"RightName": "内分泌科"
    },
		]
	},
	{
		"LeftId": 2,
		"LeftName": "外科",
		"RightList": [
		{
			"RightId": 21,
			"RightName": "普通外科"
    },
    {
			"RightId": 22,
			"RightName": "胸外科"
    },
    {
			"RightId": 23,
			"RightName": "骨外科"
    },
    {
			"RightId": 24,
			"RightName": "泌尿外科"
		},
		]
  },
  {
		"LeftId": 3,
		"LeftName": "急诊科",
		"RightList": [
		
    {
			"RightId": 31,
			"RightName": "急诊科"
		},
		]
  },
  {
		"LeftId": 4,
		"LeftName": "发热门诊",
		"RightList": [
		
    {
			"RightId": 41,
			"RightName": "发热门诊"
		},
		]
  },
  {
		"LeftId": 5,
		"LeftName": "口腔科",
		"RightList": [
		
    {
			"RightId": 51,
			"RightName": "口腔科"
		},
		]
  },
  {
		"LeftId": 6,
		"LeftName": "皮肤科",
		"RightList": [
		
    {
			"RightId": 61,
			"RightName": "皮肤科"
		},
		]
  },
]

Page({
	/**	
	 * 页面的初始数据
	 */
	data: {
		List : List,
		selectLeftName : null,
		selectRightName : null,
		currentIndex_L : null,
		currentIndex_R : null,
		scrollTop : 0
	},
	
	/**
	 * 左导航点击事件
	 */
	bindleLeftItemTap(e) {
		const {index} = e.currentTarget.dataset;
		this.setData({
			currentIndex_L:index,
			currentIndex_R : null,
			selectLeftName : this.data.List[index].LeftName,
			selectRightName : null,
			scrollTop : 0,
		}) 
	},

	/**
	 * 右导航点击事件
	 */
	bindleRightItemTap(e) {
		const {index} = e.currentTarget.dataset;
		let index_L = this.data.currentIndex_L;
		this.setData({
			currentIndex_R : index,
			selectRightName : this.data.List[index_L].RightList[index].RightName,
		}) 
	},

	/**
	 * 底部查看详情按钮点击事件
	 */
	toDetail(e) {
		var selectLeftName = this.data.selectLeftName;
		var selectRightName = this.data.selectRightName;

		if(selectLeftName === null){
			wx.showToast({
				title: '请选择一种分类或商品！',
				icon: 'none',
				duration: 1500,
				mask: true
			});
			return;
		}
		if(selectRightName != null) {
			wx.navigateTo({
				url: '/pages/reserve/reserve' + '?' +
				'selectLeftName=' + selectLeftName+ 
				'&selectRightName=' + selectRightName,
				});
			}
			else {
				wx.navigateTo({
				url: '/pages/reserve/reserve' + '?' +
				'&selectLeftName=' + selectLeftName,
			});
		}	
	},
})
