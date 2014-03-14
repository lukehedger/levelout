lukehedger.github.io
====================

## Stack

- CoffeeScript - A language that compiles to JavaScript
- Myth - A CSS preprocessor [http://www.myth.io/](http://www.myth.io/)
- Requirejs - A JavaScript file and module loader
- Gulpjs - A JavaScript task runner

## Structure

TODO

## Setup

### Jekyll

Build, serve and watch

```$ jekyll serve --watch```

URL - http://localhost:4000

#### Bundler

Used on top of Jekyll to keep Ruby packages up-to-date [http://bundler.io/](http://bundler.io/)

Use `bundle install` to install all dependencies.

```$ bundle exec jekyll serve --watch```

### Gulp

Runs our tasks - like compiling CoffeeScript and Myth CSS files.

- Install Gulp `sudo npm install -g gulp`
- Install Gulp dependencies `sudo npm install --save-dev`
- Compile and watch `gulp watch`
- Or just compile once `gulp`
- Stop watching `ctrl + z`