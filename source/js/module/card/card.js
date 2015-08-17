/**
 * @module:   card
 * @scss:     ./source/css/module/card.scss
 * @html:     ./source/js/module/card/card.html
 */

import Module from '../abstract-module';
import template from './card.html';

export default Module.extend({

  template: template,

  oninit() {

    this.on({
      toLink(e, slug) {
        if (typeof this.get('content.link') === 'undefined' && typeof slug === 'undefined') return;

        if (this.get('post')) {
          this.fire('nav', `/blog/${slug}`);
        } else {
          window.open(this.get('content.link'));
        }
      }
    });

  }

});
