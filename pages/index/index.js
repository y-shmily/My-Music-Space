// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 搜索模块的初始数据
    search_input_txt: '请输入搜索内容...',
    search_input_text: '',

    // 被点击的首页导航的菜单的索引
    currentIndexNav: 0,
    // 首页导航数据
    tabs: [
      '个性推荐',
      '歌单',
      '主播电台',
      '排行榜'
    ],

    // 轮播图图片地址数据
    side: [
      '../../images/images-xxl/img1.png',
      '../../images/images-xxl/img2.png',
      '../../images/images-xxl/img3.png',
      '../../images/images-xxl/img4.png',
    ],
    // 歌曲类型的值及类型图标地址
    portals: [
      { name: '私人FM', img_address: '../../icons/icons-XL/yinyue.png' },
      { name: '每日歌曲推荐', img_address: '../../icons/icons-XL/yinyue.png' },
      { name: '云音乐新歌榜', img_address: '../../icons/icons-XL/yinyue.png' }
    ],

    list_txt: [
      { name: '白月光与朱砂痣', name_txt: '大籽', img_address: 'https://imgessl.kugou.com/stdmusic/20210108/20210108140917812180.jpg', music_address: "https://webfs.yun.kugou.com/202102041920/7565c40f7544c62980f6a1ebe9fdd982/KGTX/CLTX001/3dce58e3635e24f3139114c5e0519def.mp3" },
      { name: '清空', name_txt: '王忻辰、苏星婕', img_address: 'https://imgessl.kugou.com/stdmusic/20210125/20210125185206971271.jpg', music_address: "https://webfs.yun.kugou.com/202102041917/b3c9da97a58f284b1b3d86a91745b015/KGTX/CLTX001/7fc61d7fce82ab5d1b8578329b06036a.mp3" },
      { name: '千千万万', name_txt: '深海鱼子酱', img_address: 'https://imgessl.kugou.com/stdmusic/20210107/20210107142301601692.jpg', music_address: "https://webfs.yun.kugou.com/202102041921/5c3815e3feb006da1a891e7a0492116b/KGTX/CLTX001/5bb27c5ded4625ad221d3b7dd7c30911.mp3" },
      { name: '踏山河', name_txt: '是七叔呢', img_address: 'https://imgessl.kugou.com/stdmusic/20201203/20201203124801937215.jpg', music_address: "https://webfs.yun.kugou.com/202102041921/c7dec406e02522a9f394d1fa39ce236f/G239/M00/0D/04/j4cBAF-87BmAQpz0ACkRT30fEHU644.mp3" },
      { name: '四季予你', name_txt: '程响', img_address: 'https://imgessl.kugou.com/stdmusic/20201219/20201219190201128745.jpg', music_address: "https://webfs.yun.kugou.com/202102061035/a175f7b52c6702ebb431ac2b8be936a5/KGTX/CLTX001/d3ed05ada906113520be598e784c038e.mp3" },
      { name: '星辰大海', name_txt: '黄霄雲', img_address: 'https://imgessl.kugou.com/stdmusic/20210114/20210114191401276567.jpg', music_address: "https://webfs.yun.kugou.com/202102041920/cf3e460a5532306466ee04bb12fe19aa/KGTX/CLTX001/f8784ebfbae36b324ec1e3441b6156b4.mp3" },
      { name: '醒不来的梦', name_txt: '回小仙', img_address: 'https://imgessl.kugou.com/stdmusic/20201203/20201203150402833578.jpg', music_address: "https://webfs.yun.kugou.com/202102061034/e618697618991233327a1e34d1f225d0/G234/M01/1F/19/ypQEAF9solOAFy9MADi7ZgAxc_0558.mp3" },
      { name: '浪子闲话', name_txt: '花僮', img_address: 'https://imgessl.kugou.com/stdmusic/20201105/20201105152707626594.jpg', music_address: "https://webfs.yun.kugou.com/202102041922/939f81dcd02ee31f9f9e0c11c6214137/G246/M06/12/11/locBAF-jqfSAVAMKADPQcJX3f9A603.mp3" },
    ],
    Music_img: '',
    Music_name: '',
    Music_name_txt: '',

  },

  /**
   * 获取音乐列表
   */
  getMusicList: function (e) {
    let that = this;
    wx.request({
      url: "http://mobilecdnbj.kugou.com/api/v3/rank/list?version=9108&plat=0&showtype=2&parentid=0&apiver=6&area_code=1&withsong=1&with_res_tag=1",
      success: (res) => {
        console.log('Music');
        console.log(res.data);
        that.setData({
          // list_txt:res.data
          Music_list: res.data.data
        })
      }
    })
  },


  // 搜索框模块点击事件
  search_input: function (e) {
    this.setData({
      search_input_text: e.detail.value
    })
    if (e.detail.value === '星动') {
      // 收起键盘
      wx.hideKeyboard()
    }
    // 可删除
    console.log(this.data.search_input_text)
  },
  // 搜索按钮点击事件
  search_btn: function (e) {
    this.setData({
      search_input_text: this.data.search_input_text
    })
    wx.showModal({
      title: '温馨提示',
      content: '点了搜索也没用',
      cancelColor: 'blue',
      confirmColor: 'red',
      cancelText: '点右边',
      confirmText: '不搜索',
      success: function (res) {
        if (res.confirm) {
          console.dir(res)
          console.log('用户点击了不搜索！')
        } else {
          console.dir(res)
          console.log('用户点击了您不想搜索！')
        }
      }
    })
    // 可删除
    console.log('用户点击搜索内容为：' + this.data.search_input_text)
  },

  // 首页导航数据点击事件
  activeNav: function (e) {
    this.setData({
      currentIndexNav: e.currentTarget.dataset.index
    })
  },
  // 点击歌曲图标类型事件
  hover_portals_item: function (e) {
    this.setData({

    })
    // 可删除
    console.log('点击歌曲图标类型事件')
  },
  // 点击歌曲事件
  list_info_nav: function (e) {
    var Music_Id = e.currentTarget.dataset.music
    var Music_info = this.data.list_txt[Music_Id]
    console.log(e)
    this.setData({
      Music_img: Music_info.img_address,
      Music_name: Music_info.name,
      Music_name_txt: Music_info.name_txt,
    }),
      wx.navigateTo({
        url: '../music/music?music_id=' + Music_Id
          + '&music_name=' + Music_info.name
          + '&music_name_txt=' + Music_info.name_txt
          + '&img_address=' + Music_info.img_address
          + '&music_address=' + Music_info.music_address,
      }),
      // 可删除
      console.dir('点击歌曲事件,以及值为' + Music_Id)
  },

  playtap: function (e) {
    wx.navigateTo({
      url: '../music/music',
    })
  },
  onLoad() {

  }
})
