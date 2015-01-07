define([], function () {
  'use strict'

  var devel = {
    init: function () {
      $(document).keydown(function(e) {
        if(e.which == 59 && e.ctrlKey) {
          $('body').toggleClass('has-grid-overlay-enabled')
        }
      })
    }
  }

  devel.init()

  return devel
})
