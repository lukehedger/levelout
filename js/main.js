(function() {
  require.config({
    paths: {
      "jquery": "lib/jquery",
      "jquery.hammer.min": "lib/jquery.hammer.min"
    },
    shim: {
      app: ["jquery"]
    }
  });

  require(["app"], function(App) {
    return new App();
  });

}).call(this);
