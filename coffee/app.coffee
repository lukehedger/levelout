define [
	"jquery"
], ($) ->

	class App

		@START_PAGE : 1

		_startPage : null

		constructor: ->

			console.log 'App running...'

			$('body').hammer
				behavior:
					userSelect: true

			@_setupView()

			setTimeout =>
				@_hideSidebar()
			,1000

		_setupView: ->

			@_startPage = $(".page[data-page='#{App.START_PAGE}']")
			
			@_addListeners()

		_addListeners: ->

			$(document).on "click", ".page-nav", @_loadPage
			$(document).on "swiperight dragright", ".main, .sidebar", @_showSidebar
			$(document).on "swipeleft dragleft", ".main, .sidebar", @_hideSidebar
			$(document).on "tap", ".sidebar-toggle", @sidebarToggleTap

			@_init()

		_init: ->

			@_startPage.fadeIn 400

		_loadPage: (e) =>

			pageNum = $(e.target).data "page"
			page = $(".page[data-page='#{pageNum}']")

			$(".page").fadeOut 400, =>
				page.fadeIn 400

		_showSidebar: (e) =>

			$(".container").removeClass "no-sidebar"

		_hideSidebar: (e) =>

			$(".container").addClass "no-sidebar"

		sidebarToggleTap: (e) =>

			$(".container").toggleClass "no-sidebar"
