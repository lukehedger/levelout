(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(["jquery"], function($) {
    var App;
    return App = (function() {
      function App() {
        this.sidebarToggleTap = __bind(this.sidebarToggleTap, this);
        this._hideSidebar = __bind(this._hideSidebar, this);
        this._showSidebar = __bind(this._showSidebar, this);
        console.log('Like what you see? Make me smile with a shout-out http://twitter.com/level_out');
        $('body').hammer({
          behavior: {
            userSelect: true
          }
        });
        this._setupView();
      }

      App.prototype._setupView = function() {
        return this._addListeners();
      };

      App.prototype._addListeners = function() {
        $(document).on("swiperight dragright", ".main, .sidebar", this._showSidebar);
        $(document).on("swipeleft dragleft", ".main, .sidebar", this._hideSidebar);
        $(document).on("tap", ".sidebar-toggle", this.sidebarToggleTap);
        return this._init();
      };

      App.prototype._init = function() {
        return setTimeout((function(_this) {
          return function() {
            return _this._hideSidebar();
          };
        })(this), 1000);
      };

      App.prototype._showSidebar = function(e) {
        return $(".container").removeClass("no-sidebar");
      };

      App.prototype._hideSidebar = function(e) {
        return $(".container").addClass("no-sidebar");
      };

      App.prototype.sidebarToggleTap = function(e) {
        return $(".container").toggleClass("no-sidebar");
      };

      return App;

    })();
  });

}).call(this);
