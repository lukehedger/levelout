/**
 * @module:   blog-preview
 * @scss:     ./source/css/module/blog-preview.scss
 * @html:     ./source/js/module/blog-preview/blog-preview.html
 */

import Module from '../abstract-module';
import template from './blog-preview.html';
import creep from '../../transition/page-creep';
import { unset } from 'mout/object';

export default Module.extend({

  template: template,

  transitions: {
    creep: creep
  },

  onrender() {

    // remove drafts from posts
    this.removeDrafts();

  },

  removeDrafts() {

    if (!this.get('draftsEnabled')) {

      let posts = this.get('posts');

      for (let post in posts) {
        if (posts.hasOwnProperty(post) && posts[post].status === 'draft') {
          unset(posts, post);
        }
      }

      this.set('posts', posts);

    }

  }

});
