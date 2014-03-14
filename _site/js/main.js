(function() {
  require.config({
    paths: {
      "jquery": "lib/jquery"
    },
    shim: {
      app: ["jquery"]
    }
  });

  require(["app"], function(App) {
    return new App();
  });

}).call(this);
