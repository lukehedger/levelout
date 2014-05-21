define [
	"jquery"
	"jquery.hammer.min"
], ($,Hammer) ->

	class App

		@START_PAGE : 1

		_hammer : null
		_startPage : null

		constructor: ->

			console.log 'App running...'

			@_hammer = $('body').hammer();

			@_setupView()

		_setupView: ->

			@_startPage = $(".page[data-page='#{App.START_PAGE}']")
			
			@_addListeners()

		_addListeners: ->

			$(document).on "click", ".page-nav", @_loadPage

			@_init()

		_init: ->

			@_startPage.fadeIn 400

		_loadPage: (e) =>

			pageNum = $(e.target).data "page"
			page = $(".page[data-page='#{pageNum}']")

			$(".page").fadeOut 400, =>
				page.fadeIn 400