import Ractive from '../module';
import template from './main.html';
import page from 'page';
import request from 'reqwest';
import moment from 'moment';
import { sort } from 'mout/array';

// register global Ractive plugins
Ractive.events.tap = require('ractive-events-tap');

const DATE_FORMAT = "DD-MM-YYYY";

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

    // set config data
    let config = data[0].config;
    this.set('config', config);

    // set work data
    let work = data[1].work;
    this.set('work', work);

    // set posts data
    let posts = data[0].posts;
    this.setPosts(posts);

    // set tags data
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

  setPosts(posts) {

    // convert posts obj to array
    let postsArray = []
    for (let post in posts) {
      if (posts.hasOwnProperty(post)) {
        postsArray.push([post, posts[post]]);
      }
    }

    // sort posts chronologically
    let postsSorted = sort(postsArray, function(a, b) {
      // convert date string to date
      let aDate = moment(a[1].date, DATE_FORMAT),
          bDate = moment(b[1].date, DATE_FORMAT);
      return bDate - aDate;
    });

    // convert array back to object
    let postsObj = {};
    postsSorted.forEach(function(post) {
      postsObj[post[0]] = post[1];
    });

    this.set('posts', postsObj);

  },

  setTags() {

    var posts = this.get('posts');

    // convert tags string to array
    for (let post in posts) {
      let tags = posts[post].tags.split(' ');
      this.set(`posts.${post}.tags`, tags);
    }

    // construct an index of tags with related posts
    var tagsTempObj = {};
    for (let post in posts) {

      if (posts.hasOwnProperty(post)) {

        // get all post tags
        let tags = posts[post].tags;

        for (let tag of tags) {

          // create new tag index
          if (!tagsTempObj.hasOwnProperty(tag)) {
            tagsTempObj[tag] = [];
          }

          // add post to tag index
          tagsTempObj[tag].push(posts[post]);

        }
      }
    }

    // convert tags obj to array for sorting
    let tagsArray = [];
    for (let tag in tagsTempObj) {
      if (tagsTempObj.hasOwnProperty(tag)) {
        tagsArray.push([tag, tagsTempObj[tag]]);
      }
    }

    // sort tags alphabetically
    let tagsSorted = sort(tagsArray, function(a, b) {
      return a[0] > b[0];
    })

    // convert array back to object
    let tagsObj = {};
    tagsSorted.forEach(function(tag) {
      tagsObj[tag[0]] = tag[1];
    });

    this.set('tags', tagsObj);

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
