define(['history'], function () {
  'use strict'

  var smooth_transitions = {
    init: function () {
      $(document).on('click touch', 'a', function(e) {
        e.preventDefault()
        smooth_transitions.goTo($(this).attr('href'))
      })
    },

    goTo: function (path) {
      history.pushState(null, null, path)
      $(window).triggerHandler('smooth_transition')
    },
  }

  return smooth_transitions
})
