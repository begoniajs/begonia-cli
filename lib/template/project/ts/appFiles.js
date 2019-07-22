module.exports = {
  script(opt = {}) {
    return `/// <reference path="${opt.typesPath}" />
//============================================================
import BE from 'begonia';
// import { mapActions, mapGetters } from 'beleaf';
// import Log from 'bebark/log/LogManager';
//============================================================
let wxLog = wx.getLogManager();
//============================================================
App(
  BE({
    data(): any {
      return {

      };
    },
    // observed: {},
//============================================================
    onLaunch(options: any): void {

    },
    onShow(options: any): void {

    },
    onHide(): void {

    },
    onError(err: any): void {
      // log the error
      // Log.error('In app onError, catch an error', err);
      wxLog.debug('In app onError, catch an error', err);
    },
    onPageNotFound(err: any): void {
      // log the error
      // Log.error('In app onPageNotFound, catch an error', err);
      wxLog.debug('In app onPageNotFound, catch an error', err);
    }
  })
);
    `;
  },
  json(opt = {}) {
    opt.window = opt.window || {};
    opt.tabBar = opt.tabBar || {};
    opt.networkTimeout = opt.networkTimeout || {};
    return `
{
  "window": {
    "navigationBarBackgroundColor": ${opt.window.navigationBarBackgroundColor || ''},
    "navigationBarTitleText": ${opt.window.navigationBarTitleText || ''},
    "navigationBarTextStyle": ${ opt.window.navigationBarTextStyle || "white"},
    "backgroundColor": ${opt.window.backgroundColor || "#ffffff"},
    "backgroundTextStyle": ${opt.window.backgroundTextStyle || "dark"},
    "enablePullDownRefresh": ${typeof opt.window.enablePullDownRefresh === 'boolean' ? opt.enablePullDownRefresh : false}
  },
  "tabBar": {
    "backgroundColor": ${opt.tabBar.backgroundColor || "#ffffff"},
    "borderStyle": ${opt.tabBar.borderStyle || "white"},
    "selectedColor": ${opt.tabBar.selectedColor || "#000000"},
    "color": ${opt.tabBar.color || "#000000"},
    "position": ${opt.tabBar.position || "bottom"},
    "list": []
  },
  "networkTimeout": {
    "request": ${opt.networkTimeout.request || 10000},
    "downloadFile": ${opt.networkTimeout.downloadFile || 30000}
  },
  "pages": [],
  "navigateToMiniProgramAppIdList": [],
  "debug": ${typeof opt.debug === 'boolean' ? opt.debug : false}
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
