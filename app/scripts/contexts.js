define([], function () {
  'use strict'

  var contexts = {

    'home': {
      conditions: {
        route: ['<front>'],
      },
      reactions: {
        dependencies: ['requester', 'home', 'requester'],
        layer: [{
          key: 'home',
          layout: 'home',
          data: function () {
            var requester = require('requester')
            return {
              posts: requester.get()
            }
          },
          postRender: function () {
            var home = require('home')
            home.init()
          }
        }]
      }
    },


    'post': {
      conditions: {
        route: ['post/*'],
      },
      reactions: {
        dependencies: ['requester', 'requester', 'marked'],
        layer: [{
          rerender: true,
          key: 'post',
          layout: 'post',
          data: function () {
            var router = require('raamwerk/context/route_context_condition')
            var requester = require('requester')
            var marked = require('marked')
            var post = requester.get(router.arg(1))

            var hasFrontMatter = post.markdown.indexOf("---") > -1

            if (hasFrontMatter) {
              var postExploded = post.markdown.split('---')
              post.full = marked(postExploded[2])
            }
            else {
              post.full = marked(post.markdown)
            }

            return {
              post: post
            }
          },
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

    'menu': {
      conditions: {
        route: ['*'],
      },
      reactions: {
        dependencies: ['fontloader'],
        layer: [{
          key: 'menu',
          layout: 'menu',
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
