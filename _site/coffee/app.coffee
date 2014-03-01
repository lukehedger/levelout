define [
	"jquery"
], ($) ->

	class App

		constructor: ->

			console.log 'App running...'
			
			@_addListeners()

		_addListeners: ->

			# $(document).on 'click','.example', @_function