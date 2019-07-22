module.exports = {
  html(opt = {}) {
    return `<view class="page ${opt.pageCSS || ''}" hover-class="none" hover-stop-propagation="false">
  This is the page ${opt.pageName || ''}.
</view>
    `;
  },
  script(opt = {}) {
    return `/**
 * @description ${opt.pageName}页面
 * @author ${opt.author} on ${new Date().toDateString()}
 */
//============================================================
import BE from 'begonia';
// import { mapActions, mapGetters } from 'beleaf';
// import Log from 'bebark/log/LogManager';
//============================================================
// let wxLog = wx.getLogManager();
//============================================================
Page(
  BE.page({

    /**
     * 页面的初始数据
     */
    data(): any {
      return {

      };
    },

    // observed: {
          // beleaf 属性观察者
    // },
//============================================================
    /**
     * @description 生命周期函数--监听页面加载
     */
    onLoad(options: any): void {

    },

    /**
     * @description 生命周期函数--监听页面卸载
     */
    onUnload(): void {

    },

    /**
     * @description 生命周期函数--监听页面初次渲染完成
     */
    onReady(): void {

    },

    /**
     * @description 生命周期函数--监听页面显示
     */
    onShow(options: any): void {

    },

    /**
     * @description 生命周期函数--监听页面隐藏
     */
    onHide(): void {

    },
//============================================================
    /**
     * @description 页面相关事件处理函数--监听用户下拉动作
     */
    // onPullDownRefresh(): void {

    // },

    /**
     * @description 页面上拉触底事件的处理函数
     */
    // onReachBottom(): void {

    // },

    /**
     * @description 用户点击右上角分享
     */
    // onShareAppMessage(): void {

    // },
//============================================================
    // ...mapActions([]),
  })
);
`;
  },
  json(opt = {}) {
    return `
{
  "navigationBarTitleText": "",
  "usingComponents": {

  }
}
    `;
  },
  scss(opt = {}) {
    return ``;
  },
  css(opt = {}) {
    return ``;
  }
};
