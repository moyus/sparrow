/*
|----------------------------------------------------------------------------
| #Modal
|----------------------------------------------------------------------------
|
|
*/

;(($) => {

  const NAME                         = 'modal'
  const DATA_KEY                     = 'modal'

  const ClassName = {
    OPEN: 'is-modal-open',
    IN: 'is-in',
    OUT: 'is-out'
  }

  const Selector = {
    DATA_TOGGLE   : '[data-toggle="modal"]',
    DATA_DISMISS  : '[data-dismiss="modal"]'
  }

  const Default = {
    show: true,
    backdrop: true
  }
  /*
  |--------------------------------------------------------------------------
  | ##Class Definition
  |--------------------------------------------------------------------------
  */
  class Modal {

    constructor(element, config) {
      this._config = config
      this._element = element
      this._isShown = false
      this._bindUIActions()
    }

    toggle() {
      return this._isShown ? this.hide() : this.show()
    }

    show() {
      if (this._isShown) {
        return
      }

      $(document.body).addClass(ClassName.OPEN)

      //backdrop
      if (this._config.backdrop == true) {
        var $old_backdrop = $('body > .backdrop');
        if ($old_backdrop.length > 0 ) {
          $old_backdrop.fadeIn(300);
        } else {
          var $new_backdrop = $('<div class="backdrop"></div>').hide().appendTo('body');
          $new_backdrop.fadeIn('fast');
        }
      }

      $(this._element).css('display', 'flex')
      this.reflow(this._element)
      $(this._element).addClass(ClassName.IN)

      this._isShown = true
    }

    reflow(el) {
      return el.offsetHeight
    }

    hide() {
      let self = this

      if (!this._isShown) {
        return
      }

      //backdrop
      if (this._config.backdrop == true) {
        var $old_backdrop = $('body > .backdrop');
        if ($old_backdrop.length > 0 ) {
          $old_backdrop.fadeOut(400, function () {
            $old_backdrop.remove();
          });
        }
      }

      $(document.body).removeClass(ClassName.OPEN)

      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
      $(this._element).addClass(ClassName.OUT)
                      .one(animationEnd, function () {
                        if ($(self._element).hasClass(ClassName.OUT)) {
                          $(self._element).removeClass("is-in is-out").hide()
                          self._isShown = false
                        }
                      })
    }

    _bindUIActions() {
      $(this._element).on('click', Selector.DATA_DISMISS, this.hide.bind(this))
    }

    static _jQueryInterface(config) {
      return this.each(function () {
        let $this = $(this)
        let data = $this.data(DATA_KEY)
        let _config = $.extend(
          {},
          Default,
          $(this).data(),
          typeof config === 'object' && config
        )

        if (!data) {
          $this.data(DATA_KEY, ( data = new Modal(this, _config) ))
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error(`No method named "${config}"`)
          }
          data[config]()
        } else if (_config.show) {
          data.show()
        }
      })
    }

  }

  /*
  |--------------------------------------------------------------------------
  | ##Document Listener
  |--------------------------------------------------------------------------
  */
  $(document)
    .on('click', Selector.DATA_TOGGLE, function (event) {
      let target = this.getAttribute('data-target')
      if (!target) {
        return false
      }
      Modal._jQueryInterface.call($(target), 'toggle')
    })

  /*
  |--------------------------------------------------------------------------
  | ##jQuery
  |--------------------------------------------------------------------------
  */
  let old = $.fn[NAME]
  $.fn[NAME] = Modal._jQueryInterface
  $.fn[NAME].Constructor = Modal
  $.fn[NAME].noConflict = () => $.fn[NAME] = old

  return Modal

})(window.Zepto || window.jQuery);
