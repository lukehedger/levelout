/**
 * @module:   blog-post
 * @scss:     ./source/css/module/blog-post.scss
 * @html:     ./source/js/module/blog-post/blog-post.html
 */

import Module from '../abstract-module';
import template from './blog-post.html';
import creep from '../../transition/page-creep';

export default Module.extend({

  template: template,

  transitions: {
    creep: creep
  },

  oninit() {

    this.on({
      goTag(e, tag) {
        this.fire('nav', `/tag/${tag}`);
      }
    });

  }

});
