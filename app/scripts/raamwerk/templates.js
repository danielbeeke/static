define(['twig'], function (twig) {
  'use strict'

  var templates = {
'about': twig.twig({
          data: 'About<a href="/">Close</a>'
}),
'home': twig.twig({
          data: 'test'
}),


  }

  return templates
})
