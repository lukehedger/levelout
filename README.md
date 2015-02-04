lukehedger.github.io
====================

## Stack

- CoffeeScript - A language that compiles to JavaScript
- Myth - A CSS preprocessor [http://www.myth.io/](http://www.myth.io/)
- Requirejs - A JavaScript file and module loader
- Gulpjs - A JavaScript task runner
- Jekyll - A static site generator
- Bundler - Used on top of Jekyll to keep Ruby packages up-to-date [http://bundler.io/](http://bundler.io/)

## Structure

TODO

## Setup

### Gulp

Runs my tasks - like compiling CoffeeScript and Myth CSS files.

- Install Gulp (if you haven't got it already): `npm install -g gulp`
- Install dependencies: `npm install`
- Compile and watch:`gulp`
- Stop watching: `ctrl + c`

### Jekyll

- Install Jekyll `gem install jekyll`
- ~~Build, serve and watch `jekyll serve --watch`~~
- Use Bundler to build, serve and watch

#### Bundler

- Install Bundler `gem install bundler`
- Install dependencies: `bundle install`
- Build, serve and watch: `bundle exec jekyll serve --watch` ([http://localhost:3000](http://localhost:3000))
- and with drafts add `--drafts`

NB. If you get any errors when running `jekyll serve` try clearing out the `Gemfile.lock` and running `bundle install`

## TODO

### v2
- [ ] Move to Divhsot hosting, to enable tag indexing -> style index pages
- [ ] Improve local dev workflow (perhaps a setup like [this](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync) or [this](https://github.com/zackcote/jekyll-kit)) -> or consider a [Metalsmith](http://www.metalsmith.io/) static-site on [Divshot](http://docs.divshot.com/integrations/metalsmith)
