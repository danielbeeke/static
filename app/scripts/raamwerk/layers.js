define(['raamwerk/layer', 'jquery'], function (layer, $) {
  'use strict'

  // The layers factory
  var newLayerKeys = []
  var makeInactiveLayerKeys = []
  var activeLayers = []
  var currentLayerKeys = []
  var keepActiveLayerKeys = []

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
          $(layers.stack[layerKey].element).removeClass('no-transitions')
          layers.stack[layerKey].makeActive()
        })
      }
    },

    finalize: function () {
      currentLayerKeys = _.keys(layers.stack)
      keepActiveLayerKeys = _.intersection(currentLayerKeys, newLayerKeys)
      makeInactiveLayerKeys = _.difference(currentLayerKeys, keepActiveLayerKeys)
      activeLayers = _.unique(_.union(newLayerKeys, keepActiveLayerKeys))

      var callback = {}

      $('body').trigger( 'delay-transfer', [activeLayers, makeInactiveLayerKeys, callback] )

      if (callback.do) {
        callback.do(function () {
          layers.realFinalize()
        })
      }
      else {
        layers.realFinalize()
      }
    },

    realFinalize: function () {
      $.each(makeInactiveLayerKeys, function (delta, layerKey) {
        layers.stack[layerKey].makeInActive()

        $(layers.stack[layerKey].element).one('transitionend', function (e) {
          layers.layerInactiveAnimationEnd(layerKey)
        })
      })


      $.each(activeLayers, function (delta, layerKey) {
        $(layers.stack[layerKey].element).addClass('no-transitions')
        $('body').trigger( 'layer-active-early', [layers.stack[layerKey]] )
      })

      layers.layerInactiveAnimationEnd()

      newLayerKeys = []
    }


  }

  return layers
})
