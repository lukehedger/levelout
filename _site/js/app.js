(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(["jquery"], function($) {
    var App;
    ({
      _newVisit: false,
      _$home: null,
      _$post: null
    });
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
        this._$home = $(document).find("#blog");
        this._$post = $(document).find("#post");
        return this._addListeners();
      };

      App.prototype._addListeners = function() {
        $(document).on("swiperight dragright", ".main, .sidebar", this._showSidebar);
        $(document).on("swipeleft dragleft", ".main, .sidebar", this._hideSidebar);
        $(document).on("tap", ".sidebar-toggle", this.sidebarToggleTap);
        $(document).on("tap", "footer .logo", this.scrollTop);
        return this._init();
      };

      App.prototype._init = function() {
        var func;
        func = this._$post.length > 0 ? this._hideSidebar() : this._showSidebar();
        return setTimeout((function(_this) {
          return function() {
            return func;
          };
        })(this), 100);
      };

      App.prototype._showSidebar = function(e) {
        if (this.noTextSelected()) {
          return $(".container").removeClass("no-sidebar");
        }
      };

      App.prototype._hideSidebar = function(e) {
        if (this.noTextSelected()) {
          return $(".container").addClass("no-sidebar");
        }
      };

      App.prototype.sidebarToggleTap = function(e) {
        return $(".container").toggleClass("no-sidebar");
      };

      App.prototype.scrollTop = function() {
        return $("html,body").animate({
          scrollTop: 0
        }, 400);
      };

      App.prototype.noTextSelected = function() {
        if (window.getSelection().type !== "Range" && window.getSelection().extentOffset === 0) {
          return true;
        } else {
          return false;
        }
      };

      return App;

    })();
  });

}).call(this);
