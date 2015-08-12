/**
 * @module:   blog
 * @scss:     ./source/css/module/blog.scss
 * @html:     ./source/js/module/blog/blog.html
 */

import Module from '../abstract-module';
import template from './blog.html';
import creep from '../../transition/page-creep';

export default Module.extend({

  template: template,

  transitions: {
    creep: creep
  },

  data() {
    return {
      posts: null
    }
  },

  computed: {

    post() {

      // search posts for matching slug
      let posts = this.get('posts');
      let slug = this.get('slug');

      for (let post in posts) {
        if (posts.hasOwnProperty(post) && posts[post].slug === slug) {
          return posts[post];
        }
      }

      // redirect to /blog if post not found
      this.fire('nav', '/blog');

    }

  },

  oninit() {

    this.on({
      goPost(e, slug) {
        this.fire('nav', `/blog/${slug}`);
      }
    });

  }

});
