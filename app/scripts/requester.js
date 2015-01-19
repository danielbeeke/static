define(['underscore'], function (_) {
  'use strict'

  var stories = {}

  var requester = {
    get: function (slug) {

      if (!_.size(stories)) {
        $.ajax({
          dataType: "json",
          async: false,
          url: '/posts.json',
          success: function (data) {
            stories = data
          }
        })
      }

      if (slug && !stories[slug].markdown) {
        $.ajax({
          async: false,
          url: '/posts/' + stories[slug].basename + '.txt',
          success: function (data) {
            stories[slug].markdown = data
          }
        })
      }

      if (slug) {
        return stories[slug]
      }

      return stories
    }
  }

  return requester
})
