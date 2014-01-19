define [
	"jquery"
], ($) ->

	class App

		constructor: ->

			@_addListeners()

			console.log 'Running...'

		_addListeners: ->
		

		_onModalOpen: ->

			$('body').addClass('modal-open').append '<div class="overlay"></div>'

		_onModalClose: =>

			$('.overlay').fadeOut 200, -> $(this).remove()
			$('body').removeClass 'modal-open'