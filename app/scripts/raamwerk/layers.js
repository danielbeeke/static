define(['raamwerk/layer', 'jquery'], function (layer, $) {
  'use strict'

  // The layers factory
  var newLayerKeys = []
  var makeInactiveLayerKeys = []
  var activeLayers = []

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

    layerInactiveAnimationEnd: function (layerKey) {
      makeInactiveLayerKeys = _.without(makeInactiveLayerKeys, layerKey)

      if (_.size(makeInactiveLayerKeys) == 0) {
        $.each(activeLayers, function (delta, layerKey) {
          layers.stack[layerKey].makeActive()
        })
      }
    },

    finalize: function () {
      var currentLayerKeys = _.keys(layers.stack)
      var keepActiveLayerKeys = _.intersection(currentLayerKeys, newLayerKeys)
      makeInactiveLayerKeys = _.difference(currentLayerKeys, keepActiveLayerKeys)

      $.each(makeInactiveLayerKeys, function (delta, layerKey) {
        layers.stack[layerKey].makeInActive()

        $(layers.stack[layerKey].element).one('transitionend', function (e) {
          layers.layerInactiveAnimationEnd(layerKey)
        })
      })

      activeLayers = _.unique(_.union(newLayerKeys, keepActiveLayerKeys))

      $.each(activeLayers, function (delta, layerKey) {
        $('body').trigger( 'layer-active-early', [layers.stack[layerKey]] )
      })

      layers.layerInactiveAnimationEnd()

      newLayerKeys = []
    }
  }

  return layers
})
