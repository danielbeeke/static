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
        }
      })

      $('body').on( 'delay-transfer', function (e, activeLayers, makeInactiveLayerKeys, callback) {
        if ($.inArray('post', makeInactiveLayerKeys) > -1) {
          // TODO refactor so it makes sense that you have to call it do and stuff.
          callback.do = function (continueCallback) {
            if ($('[layer="post"]').scrollTop() > 0) {
              $('[layer="post"]').animate({scrollTop: 0}, 600, function () {
                continueCallback()
              })
            }
            else {
              continueCallback()
            }
          }
        }
      })

      $('body').on('layer-active-early', function (e, layer) {
        if (layer.key == 'home') {
          var fullPost = $('.post--full').attr('data-slug')
          if (fullPost) {
            $('[layer="home"]').addClass('inactive')
            $('.post--teaser[data-slug="' + fullPost + '"]').addClass('active')
          }
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
