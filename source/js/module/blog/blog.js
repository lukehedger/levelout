/**
 * @module:   blog
 * @scss:     ./source/css/module/blog.scss
 * @html:     ./source/js/module/blog/blog.html
 */

import Module from '../abstract-module';
import template from './blog.html';

export default Module.extend({

  template: template,

  data() {
    return {
      posts: null
    }
  },

  oninit() {

    this.on({
      goPost(e, slug) {
        this.fire('nav', `/blog/${slug}`);
      }
    });

  },

  onrender() {

    // listen for post requested via slug
    this.observe('slug', function (n, o) {
      if (n) this.setPost(n);
    });

  },

  setPost(slug) {

    // search posts for matching slug
    var posts = this.get('posts');

    for (var post in posts) {
      if (posts.hasOwnProperty(post) && posts[post].slug === slug) {
        return this.set('post', posts[post]);
      }
    }

    // redirect to /blog if post not found
    this.fire('nav', '/blog');

  }

});
