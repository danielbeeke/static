define(['raamwerk/renderer'], function (renderer) {
  'use strict'

  // A layer class.
  // @info must atleast contain:
  //
  // {
  //   key: 'layerName' // this is unique, will be merged if created again
  //   layout: 'two-columns'
  // }

  // The main concept for animating routes is that you leave the old layer in a state and you return to the same state.

  var layer = function (info) {
    var timeout
    var innerClass = {
      key: info.key,
      layout: info.layout,
      element: null,

      // Class methods.
      claimElement: function () {
        if (!$('[layer="' + innerClass.key + '"]').length) {
          $('#app').append('<div layer="' + innerClass.key + '"></div>')
        }

        innerClass.element = $('[layer="' + innerClass.key + '"]')[0]
      },

      makeActive: function () {
        $('body').trigger( 'layer-active', [innerClass] )
        innerClass.active = true
        $(innerClass.element).removeClass('inactive').addClass('active')
      },

      makeInActive: function () {
        $('body').trigger( 'layer-inactive', [innerClass] )
        innerClass.active = false
        $(innerClass.element).addClass('inactive').removeClass('active')
      },

      render: function () {
        var data = innerClass.data && typeof(innerClass.data) == 'function' ? innerClass.data() : {}
        var html = renderer.get(innerClass.layout, data)
        innerClass.claimElement()
        $(innerClass.element).html(html)

        if (innerClass.postRender && typeof(innerClass.postRender) == 'function') {
          innerClass.postRender()
        }
      }
    }

    // Inherit the given data/functions to the class.
    if (info.data) { innerClass.data = info.data }
    if (info.postRender) { innerClass.postRender = info.postRender }

    return innerClass
  }

  return layer
})
