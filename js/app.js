(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(["jquery", "jquery.hammer.min"], function($, Hammer) {
    var App;
    return App = (function() {
      App.START_PAGE = 1;

      App.prototype._hammer = null;

      App.prototype._startPage = null;

      function App() {
        this._loadPage = __bind(this._loadPage, this);
        console.log('App running...');
        this._hammer = $('body').hammer();
        this._setupView();
      }

      App.prototype._setupView = function() {
        this._startPage = $(".page[data-page='" + App.START_PAGE + "']");
        return this._addListeners();
      };

      App.prototype._addListeners = function() {
        $(document).on("click", ".page-nav", this._loadPage);
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

      return App;

    })();
  });

}).call(this);
