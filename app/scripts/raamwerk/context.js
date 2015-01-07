define(['contexts', 'underscore', 'async'], function (contexts, _, async) {
  'use strict'

  var context = {
    plugins: {
      conditions: {},
      reactions: {}
    },

    activeConditionPlugins: {},

    init: function () {
      // Prepare the data structure,
      // This function maps the following structure plugin > contexts
      context.getPluginsAndContextsFromContexts(contexts, 'conditions')

      $.each(context.plugins['conditions'], function (pluginName, pluginInfo) {
        context.activeConditionPlugins[pluginName] = 'raamwerk/context/' + pluginName + '_context_condition'
      })

      // Require all the context plugins for the app at once.
      require(_.values(context.activeConditionPlugins), function () {
        $.each(context.activeConditionPlugins, function (pluginName, pluginPath) {
          var plugin = require(pluginPath)

          // Init the plugin and give the contexts for it.
          plugin.init(context.plugins['conditions'][pluginName].contexts)
        })
      })
    },

    execute: function (pluginContexts) {
      var matchedContexts = {}

      // The plugin gives a set of contexts to check on.
      $.each(pluginContexts, function (contextName, contextDefinition) {
        var matches = {}
        $.each(contextDefinition.conditions, function (pluginName, pluginData) {
          var pluginPath = context.activeConditionPlugins[pluginName]
          var plugin = require(pluginPath)
          var match = plugin.execute(pluginData)

          matches[pluginName] = match
        })

        var matchContext = false
        var matchContextCounter = 0

        $.each(matches, function (plugin, match) {
          // matchAllConditions
          if (contextDefinition.matchAllConditions && contextDefinition.matchAllConditions == true && match == true) {
            matchContextCounter++

            matchContext = Math.floor(_.size(matches) / matchContextCounter)
          }

          // NOT matchAllConditions
          else {
            if (match == true) {
              matchContext = true
            }
          }
        })

        if (matchContext == true) {
          matchedContexts[contextName] = contextDefinition
        }
      })

      context.getPluginsAndContextsFromContexts(matchedContexts, 'reactions')

      var plugins = []
      var initBuffers = []

      $.each(context.plugins['reactions'], function (pluginName, pluginInfo) {
        plugins.push('raamwerk/context/' + pluginName + '_context_reaction')
      })

      // Init all condition plugins.
      require(plugins, function () {
        // Sort the plugins on plugin weight.
        context.plugins['reactions'] = _.sortBy(context.plugins['reactions'], function (pluginInfo, pluginName) {
          pluginInfo.name = pluginName
          var plugin = require('raamwerk/context/' + pluginName + '_context_reaction')
          return plugin.weight
        })

        $.each(context.plugins['reactions'], function (delta, pluginInfo) {
          var plugin = require('raamwerk/context/' + pluginInfo.name + '_context_reaction')

          initBuffers.push(function (callback) {
            plugin.execute(pluginInfo.contexts, function () {
              callback()
            })
          })
        })

        // Call all the functions in series, so that we can use weights in de modules.
        // Main modules that needs the weights is the dependency module.
        async.series(initBuffers)
      })
    },

    getPluginsAndContextsFromContexts: function (selectedContexts, type) {
      context.plugins[type] = {}

      $.each(selectedContexts, function (contextName, contextDefinition) {
        // Get all the used condition plugins by the defined contexts.
        $.each(contextDefinition[type], function (pluginName, pluginInput) {
          if (!context.plugins[type][pluginName]) {
            context.plugins[type][pluginName] = {}
            context.plugins[type][pluginName].contexts = {}
          }

          context.plugins[type][pluginName].contexts[contextName] = contextDefinition
        })
      })
    }
  }

  return context
})
