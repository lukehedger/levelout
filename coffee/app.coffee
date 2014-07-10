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
				@_showSidebar()
			,100

		_showSidebar: (e) =>

			if @noTextSelected()
				$(".container").removeClass "no-sidebar"

		_hideSidebar: (e) =>

			if @noTextSelected()
				$(".container").addClass "no-sidebar"

		sidebarToggleTap: (e) =>

			$(".container").toggleClass "no-sidebar"

		scrollTop: ->

			$("html,body").animate {scrollTop: 0},400

		noTextSelected: ->

			return if window.getSelection().type isnt "Range" and window.getSelection().extentOffset is 0 then true else false
