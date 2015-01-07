define(['raamwerk/layers'], function (layers) {
  'use strict'

  var layer_context_reaction = {
    weight: 1,
    execute: function (contexts, callback) {
      $.each(contexts, function (contextName, contextDefinition) {
        $.each(contextDefinition.reactions.layer, function (delta, layerInfo) {
          layers.addLayer(layerInfo)
        })

        if (callback && typeof callback == 'function') {
          callback()
        }
      })
    }
  }

  return layer_context_reaction
})
