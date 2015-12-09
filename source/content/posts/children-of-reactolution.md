---
title: Children of the Reactolution
detail: The story of how discovering the magic of this.props.children changed my life. Forever
read: 3
tags: javascript, react
comments: true
slug: children-of-reactolution
shot: posts/children-of-reactolution.jpg
status: published
date: 25-11-2015
---

*Update (09-12-2015) - I've realised what I was rambling on about are actually [Higher Order Components](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.iigxo4oyt) and can/should be built as [pure functions](https://github.com/reactjs/react-future/blob/master/01%20-%20Core/03%20-%20Stateless%20Functions.js) (rather than classes) in React.*

When I first came across [`this.props.children`](https://facebook.github.io/react/tips/children-props-type.html) I couldn't fathom a use for it. I (un)ashamedly used it [cargo-style](https://en.wikipedia.org/wiki/Cargo_cult_programming) when setting up [ReactRouter](https://github.com/rackt/react-router#whats-it-look-like) - the router has children that are rendered dynamically based on the route. Sure, that made sense but when else could I use that? Why would a component have children that weren't DOM nodes?

One of the most important approaches to take when using React is to abandon the old way of thinking - React is as much about [methodologies](https://facebook.github.io/react/docs/thinking-in-react.html) as it is about utilities. Once you realise this things start making a lot more sense. My discovery of the `this.props.children` magic seemed to manifest suddenly; after a Five Guys lunch and some table-tennis.

### Usage

Once you do discover its magic (and forget how you *used* to do things), you start seeing where `this.props.children` can be useful.

Using Redux and the [Smart/Dumb Components pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.nz5no5i5h) I ran into problems when trying to nest dumb components. State updates on the child dumb component would trigger a re-render on the parent as data was flowing from the smart component through the dumb parent and into the dumb child. Not good.

Then this [lightbulb](https://facebook.github.io/react/docs/multiple-components.html#children) flashed on:

```js
<Parent><Child /></Parent>
```

#### An example

Let's look at a `<Loader />` component as an example of this practice. The component takes the content that is being loaded as its children:

```js
import React, { Component } from 'react';
import Loader from '../component/loader';
import SomeComponent from '../component/somecomponent';

class Container extends Component {

  render() {

    const { isFetching } = this.props;

    return (
      <div>

        <Loader loading={isFetching}>
          <SomeComponent />
        </Loader>

      </div>
    );

  }

}
```

The loader's children aren't rendered until the load process has completed:

```js
import React, { Component, PropTypes } from 'react';

export default class Loader extends Component {

  render() {

    const { loading, children } = this.props;

    const spinner = <div className='spinner'></div>;

    const content = loading ? spinner : children;

    return (
      <div>

        {content}

      </div>
    );

  }

}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired
};
```

#### Props to Children

It is also possible to pass props to children through [cloning](https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement):

```js
import React, { Component, Children, cloneElement } from 'react';

export default class Nav extends Component {

  render() {

    const { children } = this.props;

    let clones = Children.map(children, child => {

      return cloneElement(child, {className: 'something dynamic', activeClassName: 'active'});

    });

    return (
      <div>

        {clones}

      </div>
    );

  }

}
```

Interesting stuff. And, one last time - `this.props.children`.
