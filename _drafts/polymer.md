---
layout: post
title: Polymer
description: Welcome to the future
read: 20
category: blog
tags: polymer web-components hello-world
comments: true
---

A window into the future; a future where web components live equally amongst all the other members of the markup world. Polymer allows you to use bleeding-edge features like HTML Imports and the mysterious-sounding Shadow DOM. Now!

<!-- ![Polymer logo](/img/posts/p-logo.svg "Polymer") -->

##### Getting started

Getting up and running with Polymer is fairly simple. You could do some background [reading](http://www.polymer-project.org/docs/start/everything.html) or [viewing](https://www.youtube.com/watch?v=irGDN5Ysi_A&list=PLRAVCSU_HVYu-zlRaqArF8Ytwz1jlMOIM) or jump straight into [creating a Polymer app](http://www.polymer-project.org/docs/start/tutorial/intro.html).

I recommend having a poke around the docs and following the Polymer tutorial to get acquainted with its concepts and syntax. Then come back here for a deeper look into how it can be used to build reusable web components and entire web apps! I've put a [commented-version of the Polymer tutorial app](https://github.com/lukehedger/hello-polymer) on GitHub if you like that sort of thing.

##### A Polymer project

The aim of this article is to move on from the official tutorial and help you create a fresh Polymer project with a few Polymer components in - plus some custom elements of your own!

So, go ahead and set up a new project with all your fave tools in as normal. You can give my homemade frontend framework - [Bayse](https://github.com/lukehedger/bayse) - a go if you like.

##### Bower

If you haven't used Bower before you can get the lowdown at [bower.io](http://bower.io/). Its basically a package manager for the browser. Polymer uses it to house components.

Install bower:
{% highlight bash %}
$ npm install -g bower
{% endhighlight %}

You'll need to create a `bower.json` file in your project root:
{% highlight bash %}
$ cd your-project
$ bower init
{% endhighlight %}

Next, install Polymer:
{% highlight bash %}
$ bower install --save Polymer/polymer
# that --save option will add the package as a dependancy in your bower.json file
{% endhighlight %}

Installing your first Bower package will also create a `bower_components` directory. To give it that extra Polymer-flavour you can rename this to simply `components`. If you choose to do this you'll also need to add a file called `.bowerrc` in the root of your project with this in:
{% highlight json %}
{
  "directory": "components"
}
{% endhighlight %}

All other Polymer packages can be installed in the same way, for example the `paper-elements`:
{% highlight bash %}
$ bower install Polymer/paper-elements
{% endhighlight %}

##### Material design

Okay, enough about [Bower](http://media.giphy.com/media/HwbdM9tzgX3a0/giphy.gif). But just a little bit about something else indirectly related: Polymer's "paper" elements are examples of Google's [Material design](http://www.google.com/design/spec/material-design/introduction.html). You can be double-efficient and try out building a Material interface whilst playing with Polymer. Google have also recently released their [Web Starter Kit](https://developers.google.com/web/starter-kit/) so you could be triple-efficient and bolt Polymer on to this.

##### HTML Imports

And so, onto Polymer. HTML Imports are like native "includes". You simply include any HTML files you damn well like using the `<link>` tag. Since Polymer components and custom elements are usually bundled into single HTML files, this works perfectly for them but you could viably use Imports in regular web apps instead of PHP includes and the like.

{% highlight html %}
<link rel="import" href="../components/font-roboto/roboto.html">   
{% endhighlight %}

##### Elements

Within these element HTML files, you'll need a couple of standard things:

+ Polymer - `<link rel="import" href="../components/polymer/polymer.html">`
+ The element itself - `<polymer-element name="test-element">`

I'd recommend saving your elements within an `elements` directory using the same naming convention as the elements themselves: `name-element`.

###### Components vs Elements

A note on the difference between components and elements:

+ **Components** are custom elements that are bundled for release with a host of other config/readme files and published on Bower. You will likely use other people's components in your project for common elements like inputs and buttons.
+ **Elements** are app-specific custom elements that are created by you, the app author, which usually consist of a single HTML file with encapsulated CSS and JavaScript. These elements are still reusable across projects and can be [published to Bower](http://www.polymer-project.org/docs/start/reusableelements.html).

##### Shadow DOM

`<template>`

Each Custom Element can only have one direct `<template>` descendant but this `<template>` can have multiple nested `<template>`s. This allows for advanced data binding and templating within elements.

##### Data binding

Templating, Expressions

##### Published properties

Published properties are automatically bound to the element and can be used anywhere you please.

How to publish
How to use
Where to use

##### AJAX example

Another cool example of data binding's power is the Polymer AJAX component.

eg.

##### Polymer()

Polymer() call registers the element so it's recognized by the browser

##### Event binding

+ change watchers

##### External scripts/CoffeeScript

##### Go, build!

Have a go at building a custom element that encompasses all of the main "components" of Polymer (pun intended). It doesn't have to look pretty or work like an app, just get the code down and have fun in the process!