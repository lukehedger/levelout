---
layout: post
title: Sails.js
description: Hitting the open sea with Sails.js
read: 20
category: blog
tags: sails node
comments: true
---

##### Setup Sails

$ npm install sails-mongo

- connections.js

module.exports.connections = {

  mongodb: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    user: '',
    password: '',
    database: 'your_mongo_db_name_here'
  }

};

- models.js

module.exports.models = {

  connection: 'mongodb',
  migrate: 'alter'

};

- local.js

module.exports = {

   port: process.env.PORT || 1337,
   environment: process.env.NODE_ENV || 'development',

   connections: {
      mongodb: {
        user: 'username',
        password: 'password',
        database: 'your_mongo_db_name_here'
      }
  }

};


##### Setup MongoDB

Install MongoDB using [Homebrew](http://brew.sh/). It may take some time for the install to complete. Further info can be found in the [Mongo manual](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/#install-mongodb)

$ brew update
$ brew install mongodb
$ mkdir -p /data/db
$ mongod
$ sails lift

NB. MongoDB must be started (`mongod`) before you start your Sails app (`sails lift`)

[Intro to MongoDB](http://www.mongodb.com/presentations/building-web-applications-mongodb-introduction)

Once your MongoDB (`mongod`) server is running, you can manage it using the `mongo` shell:
$ mongo
$ db # current db
$ shows dbs # list available dbs
$ use test # switch to specified db, in this case test
$ db.dropDatabase() # remove current db
$ show collections # list collections within db
$ db.user.find() # query specified collection, in this case user

[Getting started with MongoDB](http://docs.mongodb.org/manual/tutorial/getting-started/) for more.

##### Quick intro

- Create new model and controller: `$ sails generate api User`
- Add attributes to User model
api/models/User.js
```
module.exports = {

  attributes: {

  	username: {
      type: 'string',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    }

  }

};
```
- View model on [http://localhost:1337/user](http://localhost:1337/user)
- Add a record using the model's JSON API eg. [http://localhost:1337/user/create?username=luke&password=test](http://localhost:1337/user/create?username=luke&password=test)
- The automatic routing of the JSON API is handled by [Sails Blueprints](http://sailsjs.org/#/documentation/reference/blueprint-api?q=blueprint-routes) and can be configured in config/blueprints.js 


##### Automatic reloading

- https://coderwall.com/p/njcr7w

##### Other points to note

- [Form validation](https://github.com/balderdashy/sails-docs/blob/0.9/models.md#validations) with Anchor
- Flash messages: The flash is a special area of the session used for storing messages.  Messages are written to the flash and cleared after being displayed to the user. The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered. [Source](https://www.npmjs.org/package/connect-flash#readme)