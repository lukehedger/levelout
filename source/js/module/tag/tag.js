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

  computed: {

    taggedPosts() {

      let search = this.get('search');
      let tagged = this.get(`tags.${search}`);

      // check for search term and recognised tag
      if (search && tagged) {

        // return posts with searched tag
        return tagged;

      }

      // redirect to /tag if tag not found
      this.fire('nav', '/tag');

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

  }

});
