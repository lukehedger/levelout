(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(["jquery"], function($) {
    var App;
    return App = (function() {
      App.START_PAGE = 1;

      App.prototype._startPage = null;

      function App() {
        this.sidebarToggleTap = __bind(this.sidebarToggleTap, this);
        this._hideSidebar = __bind(this._hideSidebar, this);
        this._showSidebar = __bind(this._showSidebar, this);
        this._loadPage = __bind(this._loadPage, this);
        console.log('App running...');
        $('body').hammer({
          behavior: {
            userSelect: true
          }
        });
        this._setupView();
        setTimeout((function(_this) {
          return function() {
            return _this._hideSidebar();
          };
        })(this), 1000);
      }

      App.prototype._setupView = function() {
        this._startPage = $(".page[data-page='" + App.START_PAGE + "']");
        return this._addListeners();
      };

      App.prototype._addListeners = function() {
        $(document).on("click", ".page-nav", this._loadPage);
        $(document).on("swiperight dragright", ".main, .sidebar", this._showSidebar);
        $(document).on("swipeleft dragleft", ".main, .sidebar", this._hideSidebar);
        $(document).on("tap", ".sidebar-toggle", this.sidebarToggleTap);
        return this._init();
      };

      App.prototype._init = function() {
        return this._startPage.fadeIn(400);
      };

      App.prototype._loadPage = function(e) {
        var page, pageNum;
        pageNum = $(e.target).data("page");
        page = $(".page[data-page='" + pageNum + "']");
        return $(".page").fadeOut(400, (function(_this) {
          return function() {
            return page.fadeIn(400);
          };
        })(this));
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
