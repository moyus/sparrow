;(function () {

  /**
   * 类定义
   */
  function Tea() {
    this.name = "tea";
    this.version = "3.0.0";
    this.device = this.getDevice();
    this.init();
  }

  /**
   * 初始化库
   */
  Tea.prototype.init = function () {
    this.addUIActions();
  }

  /**
   * 初始化交互事件
   */
  Tea.prototype.addUIActions = function () {

    // remove 300ms click delay.
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }

  }

  /**
   * 获取用户设备信息
   * @return {Object}
   */
  Tea.prototype.getDevice = function () {
    var ua      = navigator.userAgent;
    var device  = {
      os: null,
      osVersion: null,
      android: false,
      iphone: false,
      ipad: false,
      ios: false,
      webView: false,
      statusBar: false,
      pixelRatio: 1
    };

    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad    = ua.match(/(iPad).*OS\s([\d_]+)/);
    var iphone  = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

    if (android) {
      device.os = 'android';
      device.osVersion = android[2];
      device.android = true;
    }

    if (ipad || iphone) {
      device.os = 'ios';
      device.ios = true;
    }
    if (iphone) {
      device.osVersion = iphone[2].replace(/_/g, '.');
      device.iphone = true;
    }
    if (ipad) {
      device.osVersion = ipad[2].replace(/_/g, '.');
      device.ipad = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
      if (device.osVersion.split('.')[0] === '10') {
        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
      }
    }

    // Webview
    device.webView = (iphone || ipad) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    // Check for status bar and fullscreen app mode
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
      device.statusBar = true;
    } else {
      device.statusBar = false;
    }

    // Pixel Ratio
    device.pixelRatio = window.devicePixelRatio || 1;

    return device;

  }

  // 建立全局单例
  window.t = window.tea = new Tea();

})();
