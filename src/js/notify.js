/*
|----------------------------------------------------------------------------
| #Notify
|----------------------------------------------------------------------------
|
|
*/

;(($) => {

  const ClassName = {
    OPEN: 'is-notify-open'
  }

  const Default = {
    show: true,
    text: 'Loading',
    type: '',
    size: '',
    timer: 2000,
    icon: ''
  }
  /*
  |--------------------------------------------------------------------------
  | ##Class Definition
  |--------------------------------------------------------------------------
  */
  class Notify {

    constructor(config) {
      this._config = config
      this._element = null
      this._container = $('body')
      this._isShown = false
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

      this._container.append(this._element)
      this._container.addClass(ClassName.OPEN)

      if (this._config.timer > 0) {
        setTimeout(() => {
          this.hide()
        }, this._config.timer)
      }

      this._isShown = true
    }

    hide() {
      let self = this

      if (!this._isShown) {
        return
      }

      self._element.fadeOut(100, () => {
        self._element.remove();
        self._container.removeClass(ClassName.OPEN)
      });

    }

    _setTemplate() {
      let className = ''
      let icon = ''
      let text = this._config.text

      switch (this._config.type) {
        case 'loading':
          icon = '<i class="sicon-spinner Notify__icon"></i>'
          break;
        case 'danger':
          icon = '<i class="sicon-danger Notify__icon"></i>'
          break;
        case 'success':
          icon = '<i class="sicon-check Notify__icon"></i>'
          break;
        case 'custom':
          icon = this._config.icon
          break;
        default:
            break;
      }

      if (this._config.size == 'lg') {
        className += ' Notify--lg'
      }

      let el = `<div class="Notify ${className}">
                  <div class="Notify__content">
                    ${icon}
                    <div class="Notify__text">${text}</div>
                  </div>
                </div>`

      this._element = $(el)

    }

    static _jQueryInterface(config) {

      let _config = $.extend(
        {},
        Default,
        typeof config === 'object' && config
      )

      return new Notify(_config)

    }

  }

  window.notify = Notify._jQueryInterface

})(window.Zepto || window.jQuery);
