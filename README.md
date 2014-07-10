lukehedger.github.io
====================

## Stack

- CoffeeScript - A language that compiles to JavaScript
- Myth - A CSS preprocessor [http://www.myth.io/](http://www.myth.io/)
- Requirejs - A JavaScript file and module loader
- Gulpjs - A JavaScript task runner
- Jekyll - A static site generator

## Structure

TODO

## Setup

### Gulp

Runs our tasks - like compiling CoffeeScript and Myth CSS files.

- Install Gulp (if you haven't got it already) `sudo npm install -g gulp`
- Install Gulp dependencies (downloads all the required node modules as specified in `package.json`) `npm install --save-dev`
- Compile and watch `gulp`
- Stop watching `ctrl + c`

### Jekyll

Build, serve and watch

```$ jekyll serve --watch```

URL - http://localhost:4000

And with drafts `--drafts`

#### Bundler

Used on top of Jekyll to keep Ruby packages up-to-date [http://bundler.io/](http://bundler.io/)

Use `bundle install` to install all dependencies.

```$ bundle exec jekyll serve --watch```

NB. If you get any errors when running `jekyll serve` trying clearing out the `Gemfile.lock` and running `bundle install`

## TODO

- [x] Gulp build tasks
    - [x] Test jekyll-gulp
- [x] Pretty permalinks
- [x] Site map
- [x] Sidebar blurb content
- [x] Custom domain
- [x] Disqus comments
- [x] Feed sidebar include with variable for logo class (currents or story) to change background color
- [x] Gulp image compression
- [ ] Redirect /blog to index -> [see](https://help.github.com/articles/redirects-on-github-pages)
- [ ] Build generator for tag index page
- [ ] Work layout