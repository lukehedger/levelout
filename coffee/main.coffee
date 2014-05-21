require.config
	paths:
		"jquery": "lib/jquery"
		"jquery.hammer.min": "lib/jquery.hammer.min"

	shim:
		app: ["jquery"]


require ["app"], (App) -> new App()