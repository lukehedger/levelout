(function() {
  require.config({
    paths: {
      "jquery": "lib/jquery",
      "jquery.hammer": "lib/jquery.hammer"
    },
    shim: {
      app: ["jquery"],
      "jquery.hammer": ["jquery"]
    }
  });

  require(["app", "jquery.hammer"], function(App) {
    return new App();
  });

}).call(this);
