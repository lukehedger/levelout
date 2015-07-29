/**
 * @module:   {{name}}
 * @scss:     {{paths.scss}}
 * @html:     {{paths.html}}
 */

import Module from '../{{nameExtend}}{{#shouldExtend}}/{{nameExtend}}{{/shouldExtend}}';
import template from './{{name}}.html';

export default Module.extend({

  template: template

});
