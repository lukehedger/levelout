define [
	"jquery"
], ($) ->

	class App

		constructor: ->

			console.log 'Like what you see? Make me smile with a shout-out http://twitter.com/level_out'

			$('body').hammer
				behavior:
					userSelect: true

			@_setupView()

		_setupView: ->
			
			@_addListeners()

		_addListeners: ->

			$(document).on "swiperight dragright", ".main, .sidebar", @_showSidebar
			$(document).on "swipeleft dragleft", ".main, .sidebar", @_hideSidebar
			$(document).on "tap", ".sidebar-toggle", @sidebarToggleTap
			$(document).on "tap", "footer .logo", @scrollTop

			@_init()

		_init: ->

			setTimeout =>
				@_hideSidebar()
			,1000

		_showSidebar: (e) =>

			$(".container").removeClass "no-sidebar"

		_hideSidebar: (e) =>

			$(".container").addClass "no-sidebar"

		sidebarToggleTap: (e) =>

			$(".container").toggleClass "no-sidebar"

		scrollTop: ->

			$("html,body").animate {scrollTop: 0},400