# Modules
We are using [Ractive components](http://docs.ractivejs.org/latest/components) to build a more modular website and also to simplify and organise the development. And to make this task of creating css/html/js files less tedious, you can use the `gulp module` task to generate those files.

To get more information about this task, run the following command:

```shell
gulp module --help
```

## Creating a module
To create a new module, just run the following command:

```shell
gulp module --add=your-module
```

If you need to extend another module, just separate the file you want to extend with a colon:

```shell
gulp module --add=your-module:another-existing-module
```

#### Sass
A new file `your-module.sass` will be created inside the **module** folder in your CSS source folder.
Also, the `index.sass` inside the module folder will be updated to import your new module, so you **don't have to do it manually**.  
If you don't need a Sass file for this module, add the `--no-css` flag.

#### JavaScript
A new file `your-module.js` will be created inside the **module/your-module** folder in your JS source folder.
Also, the `index.js` inside the module folder will be updated to register this new component inside Ractive, so you **don't have to do it manually**. The prefix `ui-` will be added to your module.  
If you don't need a JavaScript file for this module, add the `--no-js` flag.

#### HTML/Ractive Template
A new file `your-module.html` will be created inside the **module/your-module** folder in your JS source folder.  
If you don't need a HTML file for this module, add the `--no-html` flag.


## Using modules
All modules are registered with the `ui-` prefix to avoid conflicts with the existing HTML tags.  
For example, if you create a module called `feed`:

```html
<ui-feed />
```

All module's data are [isolated](http://docs.ractivejs.org/latest/components#isolated-boolean-) from its parent, but you can still send data as an html attribute:

```html
<ui-feed visible="true" num-items="5" items="{{model_from_parent}}" />
```

You can read more about components on [Ractive's documentation](http://docs.ractivejs.org/latest/components).

## Removing a module
If by any reason you need to delete a module, just run:

```shell
gulp module --remove=your-module
```

And all files related to this module will be deleted.


## Ignore file-type at creation
If you don't want to create one of the files (js, html, scss), you can set a flag when creating a module:

```shell
gulp module --add=your-module --no-css # will not generate the .scss file
gulp module --add=your-module --no-js # will not generate the .js file
gulp module --add=your-module --no-html # will not generate the .html file
```

The options are:

```shell
--no-css --no-js --no-html
```
