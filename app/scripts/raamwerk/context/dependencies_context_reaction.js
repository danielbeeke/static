define([], function () {
  'use strict'

  var dependencies_context_reaction = {
    weight: -100,
    execute: function (contexts, callback) {
      var dependenciesToLoad = []

      $.each(contexts, function (contextName, contextDefinition) {
        $.each(contextDefinition.reactions.dependencies, function (delta, dependency) {
          dependenciesToLoad.push(dependency)
        })
      })

      require(dependenciesToLoad, function () {
        if (callback && typeof callback == 'function') {
          callback()
        }
      })
    }
  }

  return dependencies_context_reaction
})
