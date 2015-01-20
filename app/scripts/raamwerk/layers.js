define(['raamwerk/layer', 'jquery'], function (layer, $) {
  'use strict'

  // The layers factory
  var newLayerKeys = []

  var layers = {
    stack: {},
    addLayer: function (info) {

      newLayerKeys.push(info.key)

      if (!layers.stack[info.key] || info.rerender) {
        var currentLayer = layers.stack[info.key] = new layer(info)
        currentLayer.render()
      }
      else {
        var currentLayer = layers.stack[info.key]
      }
    },

    finalize: function () {
      var currentLayerKeys = _.keys(layers.stack)
      var keepActiveLayerKeys = _.intersection(currentLayerKeys, newLayerKeys)
      var makeInactiveLayerKeys = _.difference(currentLayerKeys, keepActiveLayerKeys)

      $.each(makeInactiveLayerKeys, function (delta, layerKey) {
        layers.stack[layerKey].makeInActive()
      })

      var activeLayers = _.unique(_.union(newLayerKeys, keepActiveLayerKeys))

      $.each(activeLayers, function (delta, layerKey) {
        layers.stack[layerKey].makeActive()
      })

      newLayerKeys = []
    }
  }

  return layers
})
