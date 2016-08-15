/*
|----------------------------------------------------------------------------
| #Tab
|----------------------------------------------------------------------------
|
|
*/

;(($) => {
  const NAME                         = 'tab'
  const DATA_KEY                     = 'tab'

  const ClassName = {
    ACTIVE: 'is-active'
  }

  const Selector = {
    DATA_TOGGLE: '[data-toggle="tab"]',
    DATA_GROUP:  '[data-group="tab"]'
  }

  /*
  |--------------------------------------------------------------------------
  | ##Class Definition
  |--------------------------------------------------------------------------
  */
  class Tab {
    constructor(element) {
      this._element = element
    }

    show() {
      let parent = $(this._element).closest(Selector.DATA_GROUP)
      let target = $(this._element).data('target') || $(this._element).attr('href')

      if ( $(target).length <= 0 ) {
        return
      }

      $(target).siblings().removeClass(ClassName.ACTIVE)
      $(parent).find(Selector.DATA_TOGGLE).removeClass(ClassName.ACTIVE)
      $(target).addClass(ClassName.ACTIVE)
      $(this._element).addClass(ClassName.ACTIVE)
    }

    _bindUIActions() {

    }

    static _jQueryInterface(config) {
      return this.each(function () {
        let $this = $(this)
        let data = $this.data(DATA_KEY)

        if (!data) {
          $this.data(DATA_KEY, ( data = new Tab(this) ))
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error(`No method named "${config}"`)
          }
          data[config]()
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
      event.preventDefault()

      Tab._jQueryInterface.call($(this), 'show')
    })

  /*
  |--------------------------------------------------------------------------
  | ##jQuery
  |--------------------------------------------------------------------------
  */
  let old = $.fn[NAME]
  $.fn[NAME] = Tab._jQueryInterface
  $.fn[NAME].Constructor = Tab
  $.fn[NAME].noConflict = () => $.fn[NAME] = old

  return Tab

})(window.Zepto || window.jQuery)
