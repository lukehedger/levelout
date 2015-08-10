/**
 * @module:   nav
 * @scss:     ./source/css/module/nav.scss
 * @html:     ./source/js/module/nav/nav.html
 */

import Module from '../abstract-module';
import template from './nav.html';

export default Module.extend({

  template: template,

  onrender() {

    // event proxies
    this.on({
      toHome() {
        this.fire('nav', '/');
      },
      toBlog() {
        this.fire('nav', '/blog');
      },
    });

  }

});
