define([], function () {
  'use strict'

  var contexts = {

    'home': {
      conditions: {
        route: ['*'],
      },
      reactions: {
        dependencies: ['requester'],
        layer: [{
          key: 'home',
          layout: 'home',
          // data: function () {},
          // postRender: function () {}
        }]
      }
    },

    'about': {
      conditions: {
        route: ['about'],
      },
      reactions: {
        layer: [{
          key: 'about',
          layout: 'about',
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
