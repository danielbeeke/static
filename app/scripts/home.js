define(['underscore', 'requester'], function (_, requester) {
  'use strict'

  var home = {
    init: function () {

      $('.post--teaser').on('click', function () {
        var that = this
        $(this).addClass('active')
      })

      $('body').on('layer-active', function (e, layer) {
        if (layer.key == 'home') {
          $('.post--teaser.active').removeClass('active')
        }
      })

    }
  }

  return home
})
