// pages/music/music.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duration: 0,

    play: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      music_id: options.music_id,
      music_name: options.music_name,
      music_name_txt: options.music_name_txt,
      img_address: options.img_address,
      music_address: options.music_address
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
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    var Music = this.data
    backgroundAudioManager.title = Music.music_name
    backgroundAudioManager.epname = Music.music_name
    backgroundAudioManager.singer = Music.music_name_txt
    backgroundAudioManager.coverImgUrl = Music.img_address
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = this.data.music_address
    backgroundAudioManager.startTime = 0

    // 监听音乐播放
    let that = this
    wx.onBackgroundAudioPlay(() => {
      that.timer && clearInterval(that.timer)
      that.timer = setInterval(() => {
        wx.getBackgroundAudioPlayerState({
          success: res => {
            let per = (res.currentPosition / res.duration) * 10000
            that.setData({
              musicPercent: Math.round(per) / 100 + '',
              duration: res.duration,
            })
          }
        })
      }, 1000)
    })

    // 监听背景音频暂停事件
    wx.onBackgroundAudioPause(() => {
      clearInterval(that.timer)
    })

    // 监听背景音频停止事件
    wx.onBackgroundAudioStop(() => {
      clearInterval(that.timer)
    })
  },

  playMusic(e) {
    if (this.data.play == true) {
      wx.pauseBackgroundAudio({
        success: (res) => {
          console.log('暂停歌曲')
        },
      })
    } else {
      var Music = e.currentTarget.dataset
      let obj = {
        dataUrl: Music.music_address,
        title: Music.music_name,
        coverImgUrl: Music.img_address
      }
      wx.playBackgroundAudio(obj)
    }
    this.setData({ play: !this.data.play })
  },

  setTouchMove(e) {
    if (e.touches[0].clientY >= 390 && e.touches[0].clientY <= 410) {
      if (e.touches[0].clientX >= 55 && e.touches[0].clientX <= 355) {
        let percent = (e.touches[0].clientX - 55) / 300 * 10000
        this.setData({
          musicPercent: Math.round(percent) / 100 + ''
        })
        this.data.current = (this.data.musicPercent / 100) * this.data.duration
      }
    }
    console.log(e)
  },

  setProgress() {
    let that = this
    console.log('bindtouchend')
    wx.getBackgroundAudioPlayerState({
      success: res => {
        that.data.current !== res.currentPosition &&
          wx.seekBackgroundAudio({
            position: that.data.current,
            success() {
              console.log('seek', that.data.current)
            }
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
  onPullDownRefresh: function (e) {

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