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

  App.prototype._init = function() {};

  App.prototype._onScroll = function() {
    if (window.pageYOffset > 150) {
      return this.$logo.classList.add("scaled");
    } else {
      return this.$logo.classList.remove("scaled");
    }
  };

  return App;

})();

new App();



},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHVrZS5oZWRnZXIvZGV2L0V4cGVyaW1lbnRzL2x1a2VoZWRnZXIuZ2l0aHViLmlvL2NvZmZlZS9hcHAuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQSxHQUFBO0VBQUEsa0ZBQUE7O0FBQUE7QUFFYyxFQUFBLGFBQUEsR0FBQTtBQUVaLGlEQUFBLENBQUE7QUFBQSxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZ0ZBQVosQ0FBQSxDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsVUFBRCxDQUFBLENBRkEsQ0FGWTtFQUFBLENBQWI7O0FBQUEsZ0JBTUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUVYLElBQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixDQUFULENBQUE7V0FFQSxJQUFDLENBQUEsYUFBRCxDQUFBLEVBSlc7RUFBQSxDQU5aLENBQUE7O0FBQUEsZ0JBWUEsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUdkLElBQUEsSUFBRyxJQUFDLENBQUEsS0FBSjtBQUFlLE1BQUEsTUFBTSxDQUFDLFFBQVAsR0FBa0IsSUFBQyxDQUFBLFNBQW5CLENBQWY7S0FBQTtXQUVBLElBQUMsQ0FBQSxLQUFELENBQUEsRUFMYztFQUFBLENBWmYsQ0FBQTs7QUFBQSxnQkFtQkEsS0FBQSxHQUFPLFNBQUEsR0FBQSxDQW5CUCxDQUFBOztBQUFBLGdCQXVCQSxTQUFBLEdBQVcsU0FBQSxHQUFBO0FBRVYsSUFBQSxJQUFHLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLEdBQXhCO2FBQ0MsSUFBQyxDQUFBLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBakIsQ0FBcUIsUUFBckIsRUFERDtLQUFBLE1BQUE7YUFHQyxJQUFDLENBQUEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFqQixDQUF3QixRQUF4QixFQUhEO0tBRlU7RUFBQSxDQXZCWCxDQUFBOzthQUFBOztJQUZELENBQUE7O0FBQUEsSUFnQ0ksR0FBQSxDQUFBLENBaENKLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgQXBwXG5cblx0Y29uc3RydWN0b3I6IC0+XG5cblx0XHRjb25zb2xlLmxvZyBcIkxpa2Ugd2hhdCB5b3Ugc2VlPyBNYWtlIG1lIHNtaWxlIHdpdGggYSBzaG91dC1vdXQgaHR0cDovL3R3aXR0ZXIuY29tL2xldmVsX291dFwiXG5cblx0XHRAX3NldHVwVmlldygpXG5cblx0X3NldHVwVmlldzogLT5cblxuXHRcdEAkbG9nbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXCIjbG9nb1wiXG5cblx0XHRAX2FkZExpc3RlbmVycygpXG5cblx0X2FkZExpc3RlbmVyczogLT5cblxuXHRcdCMgQCRsb2dvLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBAX3Njcm9sbFRvcFxuXHRcdGlmIEAkbG9nbyB0aGVuIHdpbmRvdy5vbnNjcm9sbCA9IEBfb25TY3JvbGxcblxuXHRcdEBfaW5pdCgpXG5cblx0X2luaXQ6IC0+XG5cblx0XHQjIGluaXQgYXBwXG5cblx0X29uU2Nyb2xsOiAoKSA9PlxuXG5cdFx0aWYgd2luZG93LnBhZ2VZT2Zmc2V0ID4gMTUwXG5cdFx0XHRAJGxvZ28uY2xhc3NMaXN0LmFkZCBcInNjYWxlZFwiXG5cdFx0ZWxzZVxuXHRcdFx0QCRsb2dvLmNsYXNzTGlzdC5yZW1vdmUgXCJzY2FsZWRcIlxuXG5uZXcgQXBwKClcbiJdfQ==
