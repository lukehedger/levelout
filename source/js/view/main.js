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
      config: null,
      posts: null,
      tags: {},
      work: null,
      blogPreviewLimit: 2
    }
  },

  oninit() {

    this.setRouter();

    this.getData();

    // handle routing events
    this.on('*.nav', function(path) {
        page(path);
      }
    );

  },

  onDataSuccess(data) {

    let config = data[0].config;
    this.set('config', config);

    let posts = data[0].posts;
    // TODO - sort posts chronologically
    // for (let post in posts) {
    //   console.log(posts[post].date, new Date(posts[post].date));
    // }
    this.set('posts', posts);

    let work = data[1].work;
    this.set('work', work);

    // convert tags string to array
    for (let post in posts) {
      let tags = posts[post].tags.split(' ');
      this.set(`posts.${post}.tags`, tags);
    }

    // analyse tags
    this.setTags();

    // TODO - might need a loading state
    this.set('isReady', true);

  },

  getData() {

    let promises = [this.requestContent(), this.requestWork()];

    Promise.all(promises)
      .then( (values) => {
        this.onDataSuccess(values);
      })
      .catch( (reason) => {
        console.error('Failed to load data', reason);
      });

  },

  requestContent() {

    return request({
      url: '/data/content.json',
      type: 'json',
      method: 'get',
      contentType: 'application/json'
    });

  },

  requestWork() {

    return request({
      url: '/data/work.json',
      type: 'json',
      method: 'get',
      contentType: 'application/json'
    });

  },

  setTags() {

    var posts = this.get('posts');

    // construct an index of tags with related posts
    for (let post in posts) {

      if (posts.hasOwnProperty(post)) {

        // get all post tags
        let tags = posts[post].tags;

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
