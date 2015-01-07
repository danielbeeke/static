define([], function () {
  'use strict'

  var contexts = {

    'home': {
      conditions: {
        route: ['*'],
      },
      reactions: {
        layer: [{
          key: 'home',
          layout: 'home',
          // data: function () {},
          // postRender: function () {}
        }]
      }
    },

    'journey': {
      conditions: {
        route: ['journey/*']
      },
      reactions: {
        dependencies: ['journey/timeline', 'fixtures'],
        layer: [{
          key: 'journey',
          layout: 'journey',
          data: function () {
            var timeline = require('journey/timeline')
            var returnData = require('fixtures')
            returnData.timeline = timeline.prepareTimeline(require('fixtures'))
            return returnData
          },
          postRender: function () {
            var timeline = require('journey/timeline')
            timeline.init()
          }
        }]
      }
    },

    'devel': {
      conditions: {
        route: ['*'],
      },
      reactions: {
        dependencies: ['raamwerk/devel']
      }
    },


  }

  return contexts
})
