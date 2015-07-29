import Ractive from '../module';
import template from './main.html';
import page from 'page';
import request from 'reqwest';

// register global Ractive plugins
Ractive.events.tap = require('ractive-events-tap');

export default Ractive.extend({

  el: document.querySelector('.main'),

  template: template,

  data() {
    return {
      view: null,
      content: null
    }
  },

  computed: {
  },

  oninit() {

    this.setRouter();

    this.getContent()
      .then(this.onContentSuccess.bind(this))
      .fail(this.onContentSuccess.bind(this));

    // handle routing events
    this.on('*.nav', function (path) {
        page(path);
      }
    );

  },

  onrender() {

    console.log('hello there');

  },

  onContentSuccess(resp) {

    this.set('content', resp);

  },

  onContentError(err) {

    console.error(err);

  },

  getContent() {

    return request({
      url: '/data/content.json',
      type: 'json',
      method: 'get',
      contentType: 'application/json'
    });

  },

  setRouter() {

    // TODO - can this be changed to () => {} ?
    var self = this;

    page('/', function () {
      self.set('view', 'index');
    });

    page('/blog/:post?', function (ctx) {
      self.set({
        view: 'blog',
        slug: ctx.params.post
      });
    });

    page({
      click: false,
      dispatch: true,
      hashbang: false
    });
  }

});
