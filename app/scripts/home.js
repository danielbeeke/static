define(['underscore', 'requester'], function (_, requester) {
  'use strict'

  var home = {
    init: function () {

      $('.post--teaser').on('click', function () {
        var that = this
        $(this).addClass('active')
      })

      $('body').on('layer-inactive', function (e, layer) {
        if (layer.key == 'post') {
          $(layer.element).animate({scrollTop: 0}, 200);
        }
      })

      $('body').on('layer-active', function (e, layer) {
        if (layer.key == 'post') {
          $(layer.element).scrollTop(0)
        }

        if (layer.key == 'home') {
          $('.post--teaser.active').removeClass('active')
        }
      })

    }
  }

  return home
})
