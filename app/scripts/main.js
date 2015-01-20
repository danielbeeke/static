require.config({
  baseUrl: '/scripts',
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    twig: '../bower_components/twig.js/twig',
    dragdealer: '../bower_components/dragdealer/src/dragdealer',
    underscore: '../bower_components/underscore/underscore',
    history: '../bower_components/history/history',
    objectwatch: '../bower_components/object-watch/index',
    async: '../bower_components/async/lib/async',
    marked: '../bower_components/marked/lib/marked'
  }
})

require(['jquery', 'raamwerk/context'], function ($, context) {

  'use strict'

  // webkit get's called twice.
  window.transitionEnd = 'transitionend'
  window.animationEnd = 'animationend'
  window.maxWaitForTransition = 3000

  context.init()
})
