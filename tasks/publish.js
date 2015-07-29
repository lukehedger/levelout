var gulp = require('gulp');
var gutil = require('gulp-util');
var markdown = require('gulp-markdown-to-json');
var argv = require('yargs').argv;
var fs = require('fs');

module.exports = function() {

  var publish = function() {

    var drafts = argv.drafts || false;
    var file = './source/content/config.md';

    fs.readFile(file, 'utf-8', function(err, data) {
      if (err) throw err;

      // update drafts config
      var newValue = data.replace(/drafts: (.*)/, 'drafts: ' + drafts);

      fs.writeFile(file, newValue, function (err) {
        if (err) throw err;
        console.log('Drafts:', drafts ? 'ON' : 'OFF');

        // convert markdown to json
        gulp.src('./source/content/**/*.md')
          .pipe(gutil.buffer())
          .pipe(markdown('content.json', {
            highlight: function (code) {
              return require('highlight.js').highlightAuto(code).value;
            }
          }))
          .pipe(gulp.dest('./public/data/'))
      });

    });

    }

    return publish();

};
