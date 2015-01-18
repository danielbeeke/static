define(['underscore', 'requester'], function (_, requester) {
  'use strict'

  var home = {
    init: function () {

      $('.post--teaser').click(function () {
        $(this).addClass('active')
      })

    }
  }

  return home
})
