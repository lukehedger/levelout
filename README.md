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

- [ ] Switch to [Rouge](https://github.com/jneen/rouge) for syntax highlighting
- [ ] Redirect /blog to index -> [see](https://help.github.com/articles/redirects-on-github-pages)
- [ ] Work layout
- [ ] Build generator for tag index page
- [ ] Bundle Jekyll build into Gulp -> [see](http://stackoverflow.com/questions/21293999/use-jekyll-with-gulp)