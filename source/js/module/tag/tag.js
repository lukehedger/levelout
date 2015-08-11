/**
 * @module:   tag
 * @scss:     ./source/css/module/tag.scss
 * @html:     ./source/js/module/tag/tag.html
 */

import Module from '../abstract-module';
import template from './tag.html';

export default Module.extend({

  template: template,

  data() {
    return {
      taggedPosts: null
    }
  },

  oninit() {

    this.on({
      goPost(e, slug) {
        this.fire('nav', `/blog/${slug}`);
      },
      goTag(e, tag) {
        this.fire('nav', `/tag/${tag}`);
      }
    });

  },

  onrender() {

    // listen for tag search
    this.observe('search', function (n, o) {
      if (n) this.searchTag(n);
    });

  },

  searchTag(search) {

    // check for search term and recognised tag
    if (search && this.get(`tags.${search}`)) {

      // return posts with searched tag
      this.set('taggedPosts', this.get(`tags.${search}`));

    } else {

      // redirect to /tag if tag not found
      this.fire('nav', '/tag');

    }

  }

});
