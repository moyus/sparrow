/*
|----------------------------------------------------------------------------
| #SmartAlert
|----------------------------------------------------------------------------
|
|
*/

;(($) => {

  const ClassName = {
    OPEN: 'is-alert-open',
    IN: 'is-in',
    OUT: 'is-out'
  }

  const Default = {
    show: true,
    title: '',
    text: '',
    showCancelBtn: false,
    cancenBtnText: '取消',
    confirmBtnText: '确认'
  }
  /*
  |--------------------------------------------------------------------------
  | ##Class Definition
  |--------------------------------------------------------------------------
  */
  class SmartAlert {

    constructor(config, cb) {
      this._config = config
      this._el = null
      this._container = $('body')
      this._isShown = false
      this._template = null
      this.callback = cb

      this._setTemplate()

      if (this._config.show === true) {
        this.show()
      }

    }

    toggle() {
      return this._isShown ? this.hide() : this.show()
    }

    show() {
      if (this._isShown) {
        return
      }

      //backdrop
      let $old_backdrop = $('body > .backdrop');
      if ($old_backdrop.length > 0 ) {
        $old_backdrop.fadeIn(300);
      } else {
        var $new_backdrop = $('<div class="backdrop"></div>').hide().appendTo('body');
        $new_backdrop.fadeIn('fast');
      }

      this._el = $(this._template).appendTo(this._container)
      this._container.addClass(ClassName.OPEN)
      this._addUIActions()

      $(this._el).css('display', 'flex')
      this._reflow(this._el)
      $(this._el).addClass(ClassName.IN)

      this._isShown = true
    }

    hide() {
      let self = this

      if (!this._isShown && !self._el) {
        return
      }

      //backdrop
      let $old_backdrop = $('body > .backdrop');
      if ($old_backdrop.length > 0 ) {
        $old_backdrop.fadeOut(400, function () {
          $old_backdrop.remove();
        });
      }

      self._container.removeClass(ClassName.OPEN)

      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
      this._el.addClass(ClassName.OUT)
              .one(animationEnd, function () {
                self._el.remove()
                self._isShown = false
              })

    }

    _addUIActions() {
      var self = this
      this._el.on('click', '.js-confirm', function(event) {
        event.preventDefault()
        self.hide()
        if (typeof self.callback == 'function') {
          self.callback(true)
        }
      });

      this._el.on('click', '.js-cancel', function(event) {
        event.preventDefault()
        self.hide()
        if (typeof self.callback == 'function') {
          self.callback(false)
        }
      });
    }

    _reflow(el) {
      return el.offsetHeight
    }

    _setTemplate() {
      let title = this._config.title
      let text = this._config.text
      let confirm_text = this._config.confirmBtnText
      let cancel_text = this._config.cancenBtnText
      let modal_header = ''
      let cancel_btn = ''

      if (title != '') {
        modal_header = `<header class="Modal__header">
                    <h4 class="Modal__title">${title}</h4>
                </header>`
      }

      if (this._config.showCancelBtn === true) {
        cancel_btn = `<a role="button" class="Modal__btn js-cancel">${cancel_text}</a>`
      }

      let el = `<div class="Modal Modal--default Modal--alert">
                  <div class="Modal__body">
                      ${modal_header}
                      <div class="Modal__content">
                        ${text}
                      </div>
                      <footer class="Modal__footer">
                          ${cancel_btn}
                          <a role="button" class="Modal__btn js-confirm">${confirm_text}</a>
                      </footer>
                  </div>
              </div>`

      this._template = el

    }

    static _jQueryInterface(config, cb = null) {

      let _config = $.extend(
        {},
        Default,
        typeof config === 'object' && config
      )

      return new SmartAlert(_config, cb)

    }

  }

  window.SmartAlert = window.sal = SmartAlert._jQueryInterface

})(window.Zepto || window.jQuery);
