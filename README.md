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

Runs our tasks - like compiling CoffeeScript and Myth CSS files.

- Install Gulp (if you haven't got it already): `npm install -g gulp`
- Install Gulp dependencies (downloads all the required node modules as specified in `package.json`): `npm install --save-dev`
- Compile and watch:`gulp`
- Stop watching: `ctrl + c`

### Jekyll

- Install Jekyll `gem install jekyll`
- Build, serve and watch `jekyll serve --watch` (http://localhost:4000)
- and with drafts add `--drafts`

#### Bundler

- Install Bundler `gem install bundler`
- Install all dependencies: `bundle install`
- Build, serve and watch: `bundle exec jekyll serve --watch`

NB. If you get any errors when running `jekyll serve` trying clearing out the `Gemfile.lock` and running `bundle install`

## TODO

- [ ] Give social button styles to nav buttons and change social to circular with font-awesome icons
- [ ] Switch to [Rouge](https://github.com/jneen/rouge) for syntax highlighting -> need mustache support
- [ ] Implement new visit check for sidebar show animation
- [ ] Work layout
- [ ] Analytics