define(['raamwerk/context', 'history'], function (context, history) {
  'use strict'

  // A context condition plugin gets a list of contexts that apply for the plugin.
  // Initiated by the init function.

  var route_context_condition = {
    contexts: {},
    init: function (contexts) {
      route_context_condition.contexts = contexts

      // Enable fake urls with smooth transitions.
      // HTML5 history API.
      $(document).on('click touch', 'a', function(e) {
        e.preventDefault()
        route_context_condition.goTo($(this).attr('href'))
      })

      $(window).on('popstate smooth_transition', function(e) {
        var path = route_context_condition.cleanPath(location.pathname)
        context.execute(contexts)
      })

      // Initial path.
      $(window).triggerHandler('smooth_transition')
    },

    goTo: function (path) {
      history.pushState(null, null, path)
      $(window).triggerHandler('smooth_transition')
    },

    execute: function (data) {
      var path = route_context_condition.cleanPath(location.pathname)
      var match = false

      $.each(data, function (delta, conditionPath) {
        if (route_context_condition.compare(path, conditionPath) == true) {
          match = true
        }
      })

      return match
    },

    compare: function (path, conditionPath) {
      return (conditionPath == '<front>' && path == '') ? true : new RegExp(route_context_condition.convertToRegExp(conditionPath), 'ig').test(path)
    },

    cleanPath: function (path) {
      // Clean the window.location.pathname
      if (path.charAt(0) == '/') path = path.substr(1)
      return path
    },

    // Converts route to a regular expression, e.g.: users/*/mickeymouse -> users\/.*\/mickeymouse
    convertToRegExp: function (conditionPath) {
      // Escapes symbols
      conditionPath = route_context_condition.preg_quote(conditionPath)

      // Rewrites wildcards again, because preg_quote() escapes them:
      // Replace wildcard followed by a slash by a piece of regex that matches wildcards not containing a slash
      conditionPath = conditionPath.replace('\\*/', '[^\/]*/')
      // Replace wildcard not followed by a slash with a regex wildcard
      conditionPath = conditionPath.replace('\\*', '.*')

      // Makes sure the whole hash must match (start to end)
      conditionPath = '^' + conditionPath + '$'
      return conditionPath
    },

    preg_quote: function (str, delimiter) {
      // Borrowed from php.js
      return String(str)
        .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
    },


    arg: function(index) {
      var parameters = route_context_condition.cleanPath(location.pathname)
      var args = parameters.split('/')
      if (parseInt(index) && args[index]) {
        return args[index]
      }
      else if (parseInt(index) && !args[index]) {
        return false
      }
      else {
        return args
      }
    },

  }

  return route_context_condition
})
