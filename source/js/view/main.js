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
      content: null,
      work: null
    }
  },

  computed: {
  },

  oninit() {

    this.setRouter();

    // TODO - merge data requests into single promise
    this.getContent()
      .then(this.onContentSuccess.bind(this))
      .fail(this.onContentError.bind(this));

    this.getWork()
      .then(this.onWorkSuccess.bind(this))
      .fail(this.onWorkError.bind(this));

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

  onWorkSuccess(resp) {

    this.set('work', resp.work);

  },

  onWorkError(err) {

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

  getWork() {

    return request({
      url: '/data/work.json',
      type: 'json',
      method: 'get',
      contentType: 'application/json'
    });

  },

  setRouter() {

    page('/', () => {
      this.set('view', 'index');
    });

    page('/blog/:post?', (ctx) => {
      this.set({
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
