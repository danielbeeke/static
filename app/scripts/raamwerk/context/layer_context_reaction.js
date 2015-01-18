define(['raamwerk/layers', 'underscore'], function (layers, _) {
  'use strict'

  var layer_context_reaction = {
    weight: 1,
    execute: function (newContexts, callback) {
      var currentLayerKeys = _.keys(layers.stack)
      var newLayerKeys = []

      $.each(newContexts, function (contextName, contextDefinition) {
        $.each(contextDefinition.reactions.layer, function (delta, layerInfo) {
          layers.addLayer(layerInfo)
          newLayerKeys.push(layerInfo.key)
        })

        if (callback && typeof callback == 'function') {
          callback()
        }
      })

      var keepActiveLayerKeys = _.intersection(currentLayerKeys, newLayerKeys)
      var makeInactiveLayerKeys = _.difference(currentLayerKeys, keepActiveLayerKeys)

      $.each(makeInactiveLayerKeys, function (delta, layerKey) {
        layers.stack[layerKey].makeInActive()
      })

    }
  }

  return layer_context_reaction
})
