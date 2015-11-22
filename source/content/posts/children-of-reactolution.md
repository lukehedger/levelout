---
title: Children of the Reactolution
detail:
read: 3
tags: javascript, react
comments: true
slug: children-of-reactolution
shot: posts/children-of-reactolution.jpg
status: draft
date: 21-11-2015
---

### Disco

Initial React - this.props.children, ReactRouter -> sure that makes sense but when else could I use that. Why would a component have children that weren't DOM nodes. Containers have child components but these are explicitly rendered with JSX.
Abandon the old way of thinking
Discovery of this.props.children magic

### Usage

Once you discover it's magic (and forget how you *used* to do things), you start seeing where this.props.children can be useful.

Smart/Dumb Components
Component nesting probs
'Wrapper' dumb components that emit DOM/have styles but have children (grandchildren?)
They can pass state from parent down to children (see also destructuring `{...other}`)

#### Loader

Another cool use I found was for a Loader component
How to pass props to children (when running a render loop) thru cloning
