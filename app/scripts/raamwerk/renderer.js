define(['twig', 'templates'], function (twig, templates) {
  'use strict'

  // Makes it possible to render sub templates.
  twig.extendFunction("child", function(template, data, needsParent) {
    if (needsParent) {
      var returnData = {}
      returnData[needsParent] = data
      return renderer.get(template, returnData)
    }
    else {
      return renderer.get(template, data)
    }
  })

  var renderer = {
    // Get's a twig template and renders it to HTML.
    get: function (template, data) {
      if (!templates[template]) {
        var loaded = twig.twig({
          id: template,
          href: '/templates/' + template + '.html',
          async: false
        })

        if (loaded) {
          templates[template] = loaded
        }
      }

      if (templates[template]) {
        return templates[template].render(data)
      }
    },
  }

  return renderer
})
