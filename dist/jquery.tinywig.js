;(function ( $, window, document, undefined ) {
  'use strict';

  // Create the defaults once
  var pluginName  = 'tinywig',
      defaults    = {
        // propertyName: 'value'
      };

  /**
   * Construct the plugin
   *
   * @param {object} element jQuery selector for plugin element
   * @param {object} options Default options
   */
  function Plugin ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element
      // and this.settings
      // you can add more functions like the one below and
      // call them like so: this.yourOtherFunction(this.element, this.settings).
      // console.log("xD");
    },
    yourOtherFunction: function () {
        // some logic
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