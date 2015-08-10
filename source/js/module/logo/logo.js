/**
 * @module:   logo
 * @scss:     ./source/css/module/logo.scss
 * @html:     ./source/js/module/logo/logo.html
 */

import Module from '../abstract-module';
import template from './logo.html';

export default Module.extend({

  template: template,

  data() {
    return {
      scaled: false
    }
  },

  onrender() {

    // event proxies
    this.on({
      toHome() {
        this.fire('nav', '/');
      }
    });

    // special logo scroll event
    if (this.get('special')) window.onscroll = this.onScroll.bind(this);

  },

  onScroll() {

    this.set('scaled', window.pageYOffset > 140);

  }

});
