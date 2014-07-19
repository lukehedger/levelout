define [
	"jquery"
], ($) ->

	_newVisit : false
	_$home : null
	_$post : null

	class App

		constructor: ->

			console.log 'Like what you see? Make me smile with a shout-out http://twitter.com/level_out'

			$('body').hammer
				behavior:
					userSelect: true

			@_setupView()

		_setupView: ->

			@_$home = $(document).find "#blog"
			@_$post = $(document).find "#post"
			
			@_addListeners()

		_addListeners: ->

			$(document).on "swiperight dragright", ".main, .sidebar", @_showSidebar
			$(document).on "swipeleft dragleft", ".main, .sidebar", @_hideSidebar
			$(document).on "tap", ".sidebar-toggle", @sidebarToggleTap
			$(document).on "tap", "footer .logo", @scrollTop

			@_init()

		_init: ->

			func = if @_$post.length > 0 then @_hideSidebar() else @_showSidebar()
			setTimeout =>
				func
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
