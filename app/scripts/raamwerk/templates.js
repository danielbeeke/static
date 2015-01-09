define(['twig'], function (twig) {
  'use strict'

  var templates = {
'about': twig.twig({
          data: 'About<a href="/">Close</a>'
}),
'home': twig.twig({
          data: '{% for post in posts %}    {{ child("post-teaser", post, "post") }}{% else %}    No posts have been found.{% endfor %}'
}),
'menu': twig.twig({
          data: '<ul>  <li><a href="/"><img class="logo" src="/images/logo.png"></a></li>  <li><a href="/about">Team</a></li>  <li><a href="/about">Werkwijze</a></li>  <li><a href="/about">Contact</a></li></ul>'
}),
'post': twig.twig({
          data: '<div class="post--full">  <h3>{{ post.title }}</h3>  <div class="body">    {{ post.full }}  </div></div>'
}),
'post-teaser': twig.twig({
          data: '<div class="post--teaser">  <h3><a href="/post/{{ post.basename }}">{{ post.title }}</a></h3>  <p class="teaser">{{ post.preview }}</p></div>'
}),


  }

  return templates
})
