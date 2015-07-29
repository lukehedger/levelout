# Writing

## Posts

To start a new post, create a `.md` file in the `/source/content/posts` directory. Add the required front-matter to the top of the document and starting writing some Markdown.

```
---
title: A Post
description: Testing posts
read: 10
tags: javascript
comments: true
slug: a-post
status: draft
---
```

## Drafts

Drafts are posts with a status of `draft` in the front-matter. By default, drafts are not shown on the contents page.

## Preview drafts

Drafts can be previewed by running `gulp publish` with the `--drafts` flag:

```
gulp publish --drafts
```

Now, when you start the local server with `gulp`, you'll see the drafts on the contents page.

Don't forget to re-publish without the `--drafts` flag before you deploy.

## Publishing

When you are ready to publish a draft post, simply change the status to `published` and then publish the posts by running:

```
gulp publish
```

This command will take all `.md` files within the `/source/content` directory and compile it to the `public/data/content.json` file, ready for use in the templates.

Once you start the local server with `gulp`, you'll see your newly published posts on the contents page.
