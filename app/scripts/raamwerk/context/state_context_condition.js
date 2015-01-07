define(['raamwerk/context', 'objectwatch'], function (context, objectwatch) {
  'use strict'

  // State condition plugins works by comparing window variables with desired values.

  var state_context_condition = {
    contexts: {},

    init: function (contexts) {
      // Init all watches
      $.each(contexts, function (contextName, contextDefinition) {
        $.each(contextDefinition.conditions.state, function (variableName, desiredValue) {
          window.watch(variableName, function (id, oldval, newval) {
            // We let it always execute even when the variable is not the desired value,
            // This is so the context machine can disable/remove layers we don't longer need.
            setTimeout(function () {
              // WTF This function needs to be run after the return of the variable.
              context.execute(contexts)
            }, 10)
            return newval
          })
        })
      })
    },

    execute: function (data) {
      var match = false

      $.each(data, function (variableName, desiredValue) {
        if (window[variableName] == desiredValue) {
          match = true
        }
      })

      return match
    }
  }

  return state_context_condition
})
