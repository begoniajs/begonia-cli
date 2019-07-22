module.exports = {
  html(opt = {}) {
    return `<view class="${opt.componentCSS || ''}" hover-class="none" hover-stop-propagation="false">
  This is the component ${opt.component || ''}.
</view>
    `;
  },
  script(opt = {}) {
    return `/**
 * @description ${opt.component}组件
 * @author ${opt.author} on ${new Date().toDateString()}
 */
//============================================================
import BE from 'begonia';
// import Log from 'bebark/log/LogManager';
//============================================================
let wxLog = wx.getLogManager();
//============================================================
Component(
  BE.component({
    // options: {
    //   addGlobalClass: true
    // },
    data(): any {
      return {

      };
    },
    properties: {

    },
    observers: {

    },
//============================================================
    /**
     * @description 组件生命周期函数-组件实例刚刚被创建
     * > 注意此时不能调用 \`setData\`
     */
    created():void {

    },
    /**
     * @description 组件生命周期函数-组件实例进入页面节点树
     */
    attached(): void {

    },
    /**
     * @description 组件生命周期函数-组件实例被从页面节点树移除
     */
    detached(): void {

    },
    /**
     * @description 组件生命周期函数-组件布局完成
     */
    ready(): void {

    },
    /**
     * @description 组件生命周期函数-组件实例被移动到节点树另一个位置
     */
    moved(): void {

    },
    /**
     * @description 组件生命周期函数-组件实例进入页面节点树
     */
    error(err: any): void {
      // log the error
      // Log.error('In ${opt.component || ''} error(), catch an error.', err);
      wxLog.debug('In ${opt.component || ''} error(), catch an error.', err);
    },
//============================================================
    pageLifetimes: {
      /**
       * @description 组件所在页面的生命周期-页面被展示
       */
      show(): void {

      },
      /**
       * @description 组件所在页面的生命周期-页面被隐藏
       */
      hide(): void {

      },
      /**
       * @description 组件所在页面-页面尺寸变化
       */
      resize(size: any): void {

      }
    },
//============================================================
    // 自定义方法集合
    methods: {

    }
  })
);

`;
  },
  json(opt = {}) {
    return `
{
  "component": true,
  "usingComponents": {}
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
