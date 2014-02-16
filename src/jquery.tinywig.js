/* global rangy */
;(function ( $, window, document, undefined ) {
  'use strict';

  // Create the defaults once
  var pluginName  = 'tinywig',
      defaults    = {
        // propertyName: 'value'
      },
      editorBar = [
        '<div class="tinywig-buttons">',
          '<div data-action="bold" class="tinywig-button fa fa-bold"></div>',
          '<div data-action="italic" class="tinywig-button fa fa-italic"></div>',
          '<div data-action="underline" class="tinywig-button fa fa-underline"></div>',
          '<div data-action="strikethrough" class="tinywig-button fa fa-strikethrough"></div>',
          '<div data-action="picture" class="tinywig-button fa fa-picture-o"></div>',
          '<div data-action="quote" class="tinywig-button fa fa-quote-left"></div>',
        '</div>'
      ].join('');

  /**
   * Construct the plugin
   *
   * @param {object} element jQuery selector for plugin element
   * @param {object} options Default options
   */
  function Plugin ( element, options ) {
    this.element      = element;
    this.settings     = $.extend( {}, defaults, options );
    this._defaults    = defaults;
    this._editorBar   = editorBar;
    this._name        = pluginName;
    this.init();
  }

  Plugin.prototype = {

    /**
     * Initialize the editable area
     *
     * @todo : store format/classes/stuff to restore it after don editing
     * @return {void}
     */
    init: function () {
      var _this     = this,
          $el       = $(this.element),
          cont      = $el.html(),
          $tempCont = $('<div class="tinywig-temp-cont-wrap" />');

      $tempCont.html(cont)
        .attr('contenteditable','true');

      $el.empty().addClass('tinywig-editor')
        .prepend(this._editorBar)
        .append($tempCont);

      $el.find('.tinywig-button').on('mousedown', function(e) {
        e.preventDefault();
        var $this   = $(this),
            action  = $this.data('action');

        if(-1 !== $.inArray(action, ['bold','italic','underline','strikethrough'])) {
          _this._toggleWrap(action);
        } else {
          console.log('the fuck?');
        }
      });
    },

    /**
     * Wrap selected text with bold, italic, underline,
     * or strikethrough styling
     *
     * @param {string} wrapWith Styling type
     *
     * @return {boolean}
     */
    _toggleWrap: function( wrapWith ) {
      var range = this._getSelection(),
          el;

      // Leaving off: it wraps, but I need to check if it was already wrapped, so that
      // I can remove the wrapping if it was.

      if (range) {
        el = document.createElement('span');
        el.className = 'tinywig-' + wrapWith;
        range.surroundContents(el);
      }
    },

    _getSelection: function () {
      var sel = rangy.getSelection();
      return sel.rangeCount ? sel.getRangeAt(0) : null;
    }
  };

  /**
   * Wraps the plugin constructor
   *
   * @param {array} options Plugin options
   *
   * @return {object} Instance of plugin
   */
  $.fn[ pluginName ] = function ( options ) {
    this.each(function() {
      if ( !$.data( this, 'plugin_' + pluginName ) ) {
        $.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
      }
    });

    // chain jQuery functions
    return this;
  };

})( jQuery, window, document );