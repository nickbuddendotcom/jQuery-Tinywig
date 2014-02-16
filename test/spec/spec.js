/* jshint expr:true */
/* global $, before, after, beforeEach, afterEach, describe, it, spyOn, xdescribe, xit, expect, to, be */
/* jshint unused: false */

// require if we're running via command line
// TODO: run tests from command line
// if (typeof require !== 'undefined') {
//   var chai      = require('chai'),
//       expect    = chai.expect;

//   jQuery = require('jquery');
//   require('../../dist/jquery.tinywig.min.js');
// }

describe('jQuery Tinywig', function() {
  'use strict';

  var $test;

  before(function(done) {

    $test = $('<p style="width:500px" />');

    $test.text([
      'Your bones don\'t break, mine do. That\'s clear.',
      'Your cells react to bacteria and viruses differently than mine.',
      'You don\'t get sick, I do. That\'s also clear. But for some reason,',
      'you and I react the exact same way to water. We swallow it too fast,',
      'we choke. We get some in our lungs, we drown. However unreal it may seem,',
      'we are connected, you and I. We\'re on the same curve, just on opposite ends.'
    ].join(''));

    $('body').before($test);

    $test.tinywig();

    done();

  });

  after(function() {
    $test.remove();
  });

  it('Initializes Template', function() {
    expect( $test.find('.tinywig-editor-buttons').length ).to.be.gt(0);
  });

  it('Wraps Selection', function() {

  });

});