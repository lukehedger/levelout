var expand = require('glob-expand');
var fs = require('fs-extra');
var path = require('path');
var del = require('del');
var minstache = require('minstache');
var changeCase = require('change-case');


function resolve(p) {

  return path.resolve(process.cwd(), p);

}

function parseTemplate(extension, data, fileName) {

  var tpl;
  var ext = '.' + (extension || 'html');
  var name = fileName || '_template';

  tpl = fs.readFileSync(path.join(__dirname, name + ext), 'utf-8');
  return minstache(tpl, data);

}

function task(cb) {

  var name;
  var nameExtend;
  var nameSplit;
  var shouldExtend;
  var paths;
  var data;

  var yargs = require('yargs');
  var argv = yargs
    .usage('Usage: gulp module [options]')
    .alias('a', 'add').nargs('a', 1).describe('a', 'Add a new module')
    .alias('r', 'remove').nargs('r', 1).describe('r', 'Remove a module')
    .alias('d', 'remove').nargs('d', 1)
    .alias('delete', 'remove')
    .alias('h', 'help').describe('h', 'Show this help info')
    .default('css', true).describe('css', 'Use --no-css to ignore the SCSS creation')
    .default('html', true).describe('html', 'Use --no-css to ignore the HTML creation')
    .default('js', true).describe('js', 'Use --no-js to ignore the JavaScript creation')
    .example('gulp module -a component', 'Add a new module named "component"')
    .example('gulp module -a component:abstract-component', 'Add a new module named "component" that extends "abstract-component"')
    .example('gulp module -a component --no-css', 'Add a new module named "component" without the SCSS file')
    .example('gulp module -a component --no-js', 'Add a new module named "component" without the JavaScript file')
    .example('gulp module -a component --no-html', 'Add a new module named "component" without the HTML file')
    .example('gulp module -d component', 'Remove the "component" module.')
    .argv;

  if (argv.help) {

    console.log(yargs.help());
    return cb();

  }


  if (!argv.add && !argv.remove) {

    return cb(new Error('No parameters set. Try using "--add" or "--remove"'));

  }

  name = argv.add || argv.remove;
  nameExtend = 'abstract-module';
  shouldExtend = name.indexOf(':') > 0;

  if (shouldExtend) {

    nameSplit = name.split(':');
    name = nameSplit[0];
    nameExtend = nameSplit[1];

  }

  paths = {
    script: './source/js/module/' + name,
    html: './source/js/module/' + name + '/' + name + '.html',
    js: './source/js/module/' + name + '/' + name + '.js',
    scss: './source/css/module/' + name + '.scss'
  };

  data = {
    name: name, shouldExtend: shouldExtend, nameExtend: nameExtend, paths: paths
  };

  if (argv.add) {

    if (argv.html) {

      fs.outputFileSync(resolve(paths.html), parseTemplate('html', data));

    }

    if (argv.js) {

      fs.outputFileSync(resolve(paths.js), parseTemplate('js', data));

    }

    if (argv.css) {

      fs.outputFileSync(resolve(paths.scss), parseTemplate('scss', data));

    }

    cb();

  } else {

    del([resolve(paths.script), resolve(paths.scss)], cb());

  }

}

task.rebuild = function(cb) {

  var jsModules;
  var scssModules;
  var jsData;
  var scssData;

  jsModules = expand({ filter: 'isFile' }, ['./source/js/module/*/*.js']);
  scssModules = expand({ filter: 'isFile' }, [
    './source/css/module/*.scss', '!./source/css/module/index.scss'
  ]);

  jsModules = jsModules.map(function(url) {

    var file = path.relative('./source/js/module', url);
    var name = path.basename(file, '.js');
    var nameCamel = changeCase.camelCase(name);
    return { name: name, nameCamel: nameCamel, file: file };

  });

  scssModules = scssModules.map(function(url) {

    var file = path.relative('./source/css/module', url);
    var name = path.basename(file, '.scss');
    var nameCamel = changeCase.camelCase(name);
    return { name: name, nameCamel: nameCamel, file: file };

  });

  jsData = parseTemplate('js', { modules: jsModules }, '_index');
  scssData = parseTemplate('scss', { modules: scssModules }, '_index');

  fs.outputFileSync(resolve('./source/js/module/index.js'), jsData);
  fs.outputFileSync(resolve('./source/css/module/index.scss'), scssData);

  cb();

};


module.exports = task;
