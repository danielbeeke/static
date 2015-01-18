define(['twig'], function (twig) {
  'use strict'

  var templates = {
'about': twig.twig({
          data: 'About<a href="/">Close</a>'
}),
'home': twig.twig({
          data: '<div class="post-wrapper">  {% for post in posts %}      {{ child("post-teaser", post, "post") }}  {% else %}      No posts have been found.  {% endfor %}</div>'
}),
'menu': twig.twig({
          data: '<ul>  <li><a href="/"><img class="logo" src="/images/logo.png"></a></li>  <li><a href="/about">Team</a></li>  <li><a href="/about">Werkwijze</a></li>  <li><a href="/about">Contact</a></li></ul>'
}),
'post': twig.twig({
          data: '<div class="post--full">  <h3>{{ post.title }}</h3>  <div class="body">    {{ post.full }}  </div></div>'
}),
'post-teaser': twig.twig({
          data: '<a href="/post/{{ post.basename }}" class="post--teaser">  <img src="/images/thumbs/{{ post.basename }}.jpg">  <h3>{{ post.title }}</h3>  <h4>{{ post.subtitle }}</h4></a>'
}),


  }

  return templates
})
