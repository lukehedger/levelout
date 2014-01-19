require.config
	paths:
		"jquery": "lib/jquery"

	shim:
		app: ["jquery"]


require ["app"], (App) -> new App()