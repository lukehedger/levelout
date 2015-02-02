(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

App = (function() {
  function App() {
    this._onScroll = __bind(this._onScroll, this);
    console.log("Like what you see? Make me smile with a shout-out http://twitter.com/level_out");
    this._setupView();
  }

  App.prototype._setupView = function() {
    this.$logo = document.querySelector("#logo");
    return this._addListeners();
  };

  App.prototype._addListeners = function() {
    if (this.$logo) {
      window.onscroll = this._onScroll;
    }
    return this._init();
  };

  App.prototype._init = function() {
    return setTimeout((function(_this) {
      return function() {
        return _this._loadShowcase();
      };
    })(this), 500);
  };

  App.prototype._onScroll = function() {
    if (window.pageYOffset > 150) {
      return this.$logo.classList.add("scaled");
    } else {
      return this.$logo.classList.remove("scaled");
    }
  };

  App.prototype._loadShowcase = function() {
    var piece, pieces, _i, _len, _results;
    pieces = document.querySelectorAll(".piece");
    _results = [];
    for (_i = 0, _len = pieces.length; _i < _len; _i++) {
      piece = pieces[_i];
      _results.push(piece.classList.add("loaded"));
    }
    return _results;
  };

  return App;

})();

new App();



},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHVrZS5oZWRnZXIvZGV2L0V4cGVyaW1lbnRzL2x1a2VoZWRnZXIuZ2l0aHViLmlvL2NvZmZlZS9hcHAuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxHQUFBO0VBQUEsa0ZBQUE7O0FBQUE7QUFFYyxFQUFBLGFBQUEsR0FBQTtBQUVaLGlEQUFBLENBQUE7QUFBQSxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZ0ZBQVosQ0FBQSxDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsVUFBRCxDQUFBLENBRkEsQ0FGWTtFQUFBLENBQWI7O0FBQUEsZ0JBTUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUVYLElBQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUFULENBQUE7V0FFQSxJQUFDLENBQUEsYUFBRCxDQUFBLEVBSlc7RUFBQSxDQU5aLENBQUE7O0FBQUEsZ0JBWUEsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUdkLElBQUEsSUFBRyxJQUFDLENBQUEsS0FBSjtBQUFlLE1BQUEsTUFBTSxDQUFDLFFBQVAsR0FBa0IsSUFBQyxDQUFBLFNBQW5CLENBQWY7S0FBQTtXQUVBLElBQUMsQ0FBQSxLQUFELENBQUEsRUFMYztFQUFBLENBWmYsQ0FBQTs7QUFBQSxnQkFtQkEsS0FBQSxHQUFPLFNBQUEsR0FBQTtXQUdOLFVBQUEsQ0FBVyxDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQSxHQUFBO2VBQ1YsS0FBQyxDQUFBLGFBQUQsQ0FBQSxFQURVO01BQUEsRUFBQTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBWCxFQUVFLEdBRkYsRUFITTtFQUFBLENBbkJQLENBQUE7O0FBQUEsZ0JBMEJBLFNBQUEsR0FBVyxTQUFBLEdBQUE7QUFFVixJQUFBLElBQUcsTUFBTSxDQUFDLFdBQVAsR0FBcUIsR0FBeEI7YUFDQyxJQUFDLENBQUEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFqQixDQUFxQixRQUFyQixFQUREO0tBQUEsTUFBQTthQUdDLElBQUMsQ0FBQSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQWpCLENBQXdCLFFBQXhCLEVBSEQ7S0FGVTtFQUFBLENBMUJYLENBQUE7O0FBQUEsZ0JBaUNBLGFBQUEsR0FBZSxTQUFBLEdBQUE7QUFFZCxRQUFBLGlDQUFBO0FBQUEsSUFBQSxNQUFBLEdBQVMsUUFBUSxDQUFDLGdCQUFULENBQTBCLFFBQTFCLENBQVQsQ0FBQTtBQUNBO1NBQUEsNkNBQUE7eUJBQUE7QUFDQyxvQkFBQSxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQWhCLENBQW9CLFFBQXBCLEVBQUEsQ0FERDtBQUFBO29CQUhjO0VBQUEsQ0FqQ2YsQ0FBQTs7YUFBQTs7SUFGRCxDQUFBOztBQUFBLElBeUNJLEdBQUEsQ0FBQSxDQXpDSixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIEFwcFxuXG5cdGNvbnN0cnVjdG9yOiAtPlxuXG5cdFx0Y29uc29sZS5sb2cgXCJMaWtlIHdoYXQgeW91IHNlZT8gTWFrZSBtZSBzbWlsZSB3aXRoIGEgc2hvdXQtb3V0IGh0dHA6Ly90d2l0dGVyLmNvbS9sZXZlbF9vdXRcIlxuXG5cdFx0QF9zZXR1cFZpZXcoKVxuXG5cdF9zZXR1cFZpZXc6IC0+XG5cblx0XHRAJGxvZ28gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIFwiI2xvZ29cIlxuXG5cdFx0QF9hZGRMaXN0ZW5lcnMoKVxuXG5cdF9hZGRMaXN0ZW5lcnM6IC0+XG5cblx0XHQjIEAkbG9nby5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgQF9zY3JvbGxUb3Bcblx0XHRpZiBAJGxvZ28gdGhlbiB3aW5kb3cub25zY3JvbGwgPSBAX29uU2Nyb2xsXG5cblx0XHRAX2luaXQoKVxuXG5cdF9pbml0OiAtPlxuXG5cdFx0IyBpbml0IGFwcFxuXHRcdHNldFRpbWVvdXQgPT5cblx0XHRcdEBfbG9hZFNob3djYXNlKClcblx0XHQsIDUwMFxuXG5cdF9vblNjcm9sbDogKCkgPT5cblxuXHRcdGlmIHdpbmRvdy5wYWdlWU9mZnNldCA+IDE1MFxuXHRcdFx0QCRsb2dvLmNsYXNzTGlzdC5hZGQgXCJzY2FsZWRcIlxuXHRcdGVsc2Vcblx0XHRcdEAkbG9nby5jbGFzc0xpc3QucmVtb3ZlIFwic2NhbGVkXCJcblxuXHRfbG9hZFNob3djYXNlOiAtPlxuXG5cdFx0cGllY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCBcIi5waWVjZVwiXG5cdFx0Zm9yIHBpZWNlIGluIHBpZWNlc1xuXHRcdFx0cGllY2UuY2xhc3NMaXN0LmFkZCBcImxvYWRlZFwiXG5cbm5ldyBBcHAoKVxuIl19
