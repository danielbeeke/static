define(['jquery'], function ($) {
  'use strict'

  var fontloader = {
    init: function () {
      try {
        if (localStorage.fontloaderFonts) {
          fontloader.addFont()
        } else {
          // We have to first load the font file asynchronously
          var request = new XMLHttpRequest()
          request.open('GET', '/styles/fonts.css', true)

          request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
              localStorage.fontloaderFonts = request.responseText
              fontloader.addFont()
            }
          }

          request.send()
        }
      } catch(ex) {
        // maybe load the font synchronously for woff-capable browsers
        // to avoid blinking on every request when localStorage is not available
      }
    },

    addFont: function () {
      var style = document.createElement('style')
      style.rel = 'stylesheet'
      document.head.appendChild(style)
      style.textContent = localStorage.fontloaderFonts
    }
  }

  fontloader.init()

  return fontloader
})
