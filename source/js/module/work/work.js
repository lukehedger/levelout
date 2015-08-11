/**
 * @module:   work
 * @scss:     ./source/css/module/work.scss
 * @html:     ./source/js/module/work/work.html
 */

import Module from '../abstract-module';
import template from './work.html';
import creep from '../../transition/page-creep';

export default Module.extend({

  template: template,

  transitions: {
    creep: creep
  }

});
