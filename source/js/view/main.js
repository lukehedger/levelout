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
      isReady: false,
      content: null,
      tags: {},
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



  },

  onContentSuccess(resp) {

    this.set('content', resp);

    // TODO - add to promise chain
    this.setTags();

    // TODO - do this at end of promise chain when ALL resolved
    // might need a loading state too
    this.set('isReady', true);

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

  setTags() {

    var posts = this.get('content.posts');

    // construct an index of tags with related posts
    for (let post in posts) {

      if (posts.hasOwnProperty(post)) {

        // get all post tags
        let tags = posts[post].tags.split(' ');

        for (let tag of tags) {

          // create new tag index
          if (!this.get('tags').hasOwnProperty(tag)) {
            this.set(`tags.${tag}`, []);
          }

          // add post to tag index
          this.push(`tags.${tag}`, posts[post]);

        }

      }

    }

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

    page('/tag/:search?', (ctx) => {
      this.set({
        view: 'tag',
        tagSearch: ctx.params.search
      });
    });

    page({
      click: false,
      dispatch: true,
      hashbang: false
    });
  }

});
