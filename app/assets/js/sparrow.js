'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
|----------------------------------------------------------------------------
| #Modal
|----------------------------------------------------------------------------
|
|
*/

;(function ($) {

  var NAME = 'modal';
  var DATA_KEY = 'modal';

  var ClassName = {
    OPEN: 'is-modal-open',
    IN: 'is-in',
    OUT: 'is-out'
  };

  var Selector = {
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]'
  };

  var Default = {
    show: true
  };
  /*
  |--------------------------------------------------------------------------
  | ##Class Definition
  |--------------------------------------------------------------------------
  */

  var Modal = function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = config;
      this._element = element;
      this._isShown = false;
      this._bindUIActions();
    }

    _createClass(Modal, [{
      key: 'toggle',
      value: function toggle() {
        return this._isShown ? this.hide() : this.show();
      }
    }, {
      key: 'show',
      value: function show() {
        if (this._isShown) {
          return;
        }

        $(document.body).addClass(ClassName.OPEN);

        $(this._element).css('display', 'flex');
        this.reflow(this._element);
        $(this._element).addClass(ClassName.IN);

        this._isShown = true;
      }
    }, {
      key: 'reflow',
      value: function reflow(el) {
        return el.offsetHeight;
      }
    }, {
      key: 'hide',
      value: function hide() {
        var self = this;

        if (!this._isShown) {
          return;
        }

        $(document.body).removeClass(ClassName.OPEN);

        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this._element).addClass(ClassName.OUT).one(animationEnd, function () {
          if ($(self._element).hasClass(ClassName.OUT)) {
            $(self._element).removeClass("is-in is-out").hide();
            self._isShown = false;
          }
        });
      }
    }, {
      key: '_bindUIActions',
      value: function _bindUIActions() {
        $(this._element).on('click', Selector.DATA_DISMISS, this.hide.bind(this));
      }
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);
          var _config = $.extend({}, Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

          if (!data) {
            $this.data(DATA_KEY, data = new Modal(this, _config));
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          } else if (_config.show) {
            data.show();
          }
        });
      }
    }]);

    return Modal;
  }();

  /*
  |--------------------------------------------------------------------------
  | ##Document Listener
  |--------------------------------------------------------------------------
  */


  $(document).on('click', Selector.DATA_TOGGLE, function (event) {
    var target = this.getAttribute('data-target');
    if (!target) {
      return false;
    }
    Modal._jQueryInterface.call($(target), 'toggle');
  });

  /*
  |--------------------------------------------------------------------------
  | ##jQuery
  |--------------------------------------------------------------------------
  */
  var old = $.fn[NAME];
  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    return $.fn[NAME] = old;
  };

  return Modal;
})(window.Zepto || window.jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
|----------------------------------------------------------------------------
| #Notify
|----------------------------------------------------------------------------
|
|
*/

;(function ($) {

  var ClassName = {
    OPEN: 'is-notify-open'
  };

  var Default = {
    show: true,
    text: 'Loading',
    type: '',
    timer: 2000,
    icon: ''
  };
  /*
  |--------------------------------------------------------------------------
  | ##Class Definition
  |--------------------------------------------------------------------------
  */

  var Notify = function () {
    function Notify(config) {
      _classCallCheck(this, Notify);

      this._config = config;
      this._element = null;
      this._container = $('body');
      this._isShown = false;
      this._setTemplate();

      if (this._config.show === true) {
        this.show();
      }
    }

    _createClass(Notify, [{
      key: 'toggle',
      value: function toggle() {
        return this._isShown ? this.hide() : this.show();
      }
    }, {
      key: 'show',
      value: function show() {
        var _this = this;

        if (this._isShown) {
          return;
        }

        this._container.append(this._element);
        this._container.addClass(ClassName.OPEN);

        if (this._config.timer > 0) {
          setTimeout(function () {
            _this.hide();
          }, this._config.timer);
        }

        this._isShown = true;
      }
    }, {
      key: 'hide',
      value: function hide() {
        var self = this;

        if (!this._isShown) {
          return;
        }

        self._element.fadeOut(100, function () {
          self._element.remove();
          self._container.removeClass(ClassName.OPEN);
        });
      }
    }, {
      key: '_setTemplate',
      value: function _setTemplate() {
        var className = '';
        var icon = '';
        var text = this._config.text;

        switch (this._config.type) {
          case 'loading':
            icon = '<i class="sicon-spinner Notify__icon"></i>';
            break;
          case 'danger':
            icon = '<i class="sicon-danger Notify__icon"></i>';
            break;
          case 'success':
            icon = '<i class="sicon-check Notify__icon"></i>';
            break;
          case 'custom':
            icon = this._config.icon;
            break;
          default:
            break;
        }

        var el = '<div class="Notify">\n                  <div class="Notify__content">\n                    ' + icon + '\n                    <div class="Notify__text">' + text + '</div>\n                  </div>\n                </div>';

        this._element = $(el);
      }
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {

        var _config = $.extend({}, Default, (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        return new Notify(_config);
      }
    }]);

    return Notify;
  }();

  window.notify = Notify._jQueryInterface;
})(window.Zepto || window.jQuery);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
|----------------------------------------------------------------------------
| #SmartAlert
|----------------------------------------------------------------------------
|
|
*/

;(function ($) {

  var ClassName = {
    OPEN: 'is-alert-open',
    IN: 'is-in',
    OUT: 'is-out'
  };

  var Default = {
    show: true,
    title: '',
    text: '',
    showCancelBtn: false,
    cancenBtnText: '取消',
    confirmBtnText: '确认'
  };
  /*
  |--------------------------------------------------------------------------
  | ##Class Definition
  |--------------------------------------------------------------------------
  */

  var SmartAlert = function () {
    function SmartAlert(config, cb) {
      _classCallCheck(this, SmartAlert);

      this._config = config;
      this._el = null;
      this._container = $('body');
      this._isShown = false;
      this._template = null;
      this.callback = cb;

      this._setTemplate();

      if (this._config.show === true) {
        this.show();
      }
    }

    _createClass(SmartAlert, [{
      key: 'toggle',
      value: function toggle() {
        return this._isShown ? this.hide() : this.show();
      }
    }, {
      key: 'show',
      value: function show() {
        if (this._isShown) {
          return;
        }

        this._el = $(this._template).appendTo(this._container);
        this._container.addClass(ClassName.OPEN);
        this._addUIActions();

        $(this._el).css('display', 'flex');
        this._reflow(this._el);
        $(this._el).addClass(ClassName.IN);

        this._isShown = true;
      }
    }, {
      key: 'hide',
      value: function hide() {
        var self = this;

        if (!this._isShown && !self._el) {
          return;
        }

        self._container.removeClass(ClassName.OPEN);

        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this._el.addClass(ClassName.OUT).one(animationEnd, function () {
          self._el.remove();
          self._isShown = false;
        });
      }
    }, {
      key: '_addUIActions',
      value: function _addUIActions() {
        var self = this;
        this._el.on('click', '.js-confirm', function (event) {
          event.preventDefault();
          self.hide();
          if (typeof self.callback == 'function') {
            self.callback(true);
          }
        });

        this._el.on('click', '.js-cancel', function (event) {
          event.preventDefault();
          self.hide();
          if (typeof self.callback == 'function') {
            self.callback(false);
          }
        });
      }
    }, {
      key: '_reflow',
      value: function _reflow(el) {
        return el.offsetHeight;
      }
    }, {
      key: '_setTemplate',
      value: function _setTemplate() {
        var title = this._config.title;
        var text = this._config.text;
        var confirm_text = this._config.confirmBtnText;
        var cancel_text = this._config.cancenBtnText;
        var modal_header = '';
        var cancel_btn = '';

        if (title != '') {
          modal_header = '<header class="Modal__header">\n                    <h4 class="Modal__title">' + title + '</h4>\n                </header>';
        }

        if (this._config.showCancelBtn === true) {
          cancel_btn = '<a role="button" class="Modal__btn js-cancel">' + cancel_text + '</a>';
        }

        var el = '<div class="Modal Modal--default Modal--alert">\n                  <div class="Modal__body">\n                      ' + modal_header + '\n                      <div class="Modal__content">\n                        ' + text + '\n                      </div>\n                      <footer class="Modal__footer">\n                          ' + cancel_btn + '\n                          <a role="button" class="Modal__btn js-confirm">' + confirm_text + '</a>\n                      </footer>\n                  </div>\n              </div>';

        this._template = el;
      }
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];


        var _config = $.extend({}, Default, (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        return new SmartAlert(_config, cb);
      }
    }]);

    return SmartAlert;
  }();

  window.SmartAlert = window.sal = SmartAlert._jQueryInterface;
})(window.Zepto || window.jQuery);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
|----------------------------------------------------------------------------
| #Tab
|----------------------------------------------------------------------------
|
|
*/

;(function ($) {
  var NAME = 'tab';
  var DATA_KEY = 'tab';

  var ClassName = {
    ACTIVE: 'is-active'
  };

  var Selector = {
    DATA_TOGGLE: '[data-toggle="tab"]',
    DATA_GROUP: '[data-group="tab"]'
  };

  /*
  |--------------------------------------------------------------------------
  | ##Class Definition
  |--------------------------------------------------------------------------
  */

  var Tab = function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    _createClass(Tab, [{
      key: 'show',
      value: function show() {
        var parent = $(this._element).closest(Selector.DATA_GROUP);
        var target = $(this._element).data('target') || $(this._element).attr('href');

        if ($(target).length <= 0) {
          return;
        }

        $(target).siblings().removeClass(ClassName.ACTIVE);
        $(parent).find(Selector.DATA_TOGGLE).removeClass(ClassName.ACTIVE);
        $(target).addClass(ClassName.ACTIVE);
        $(this._element).addClass(ClassName.ACTIVE);
      }
    }, {
      key: '_bindUIActions',
      value: function _bindUIActions() {}
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            $this.data(DATA_KEY, data = new Tab(this));
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }]);

    return Tab;
  }();

  /*
  |--------------------------------------------------------------------------
  | ##Document Listener
  |--------------------------------------------------------------------------
  */


  $(document).on('click', Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  });

  /*
  |--------------------------------------------------------------------------
  | ##jQuery
  |--------------------------------------------------------------------------
  */
  var old = $.fn[NAME];
  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    return $.fn[NAME] = old;
  };

  return Tab;
})(window.Zepto || window.jQuery);
//# sourceMappingURL=sparrow.js.map
