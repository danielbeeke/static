define(['raamwerk/layer'], function (layer) {
  'use strict'

  // The layers factory

  var layers = {
    stack: {},
    addLayer: function (info) {

      if (!layers.stack[info.key]) {
        var currentLayer = layers.stack[info.key] = new layer(info)
        currentLayer.render()
      }
      else {
        var currentLayer = layers.stack[info.key]
      }

      setTimeout(function () {
        currentLayer.makeActive()
      }, 10)
    },
  }

  return layers
})
