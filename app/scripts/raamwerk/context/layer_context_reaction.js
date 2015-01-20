define(['raamwerk/layers', 'underscore'], function (layers, _) {
  'use strict'

  var layer_context_reaction = {
    weight: 1,
    execute: function (newContexts, callback) {
      $.each(newContexts, function (contextName, contextDefinition) {
        $.each(contextDefinition.reactions.layer, function (delta, layerInfo) {
          layers.addLayer(layerInfo)
        })

        if (callback && typeof callback == 'function') {
          callback()
        }
      })

      layers.finalize()
    }
  }

  return layer_context_reaction
})
