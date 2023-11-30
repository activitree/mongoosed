Documentation for Mongoose: https://mongoosejs.com/docs/

## Mongoosed - Puts Mongoose in Meteor V2.12+ server side ##
This is the first functional version, already in use in production by Activitree Co. but we will still call it "experimental"
until it gets more mature in more projects. It uses the latest version of Mongoose compatible with Node 14 (and MongoDB 5.* - https://github.com/mongodb/js-bson#mongodb-nodejs-driver-version-compatibility)

We use this mainly to replace Meteor Grapher's queries. We don't use publications with Grapher and this package it is only usable with Meteor methods.
However, there are some future todos which include change streams. All types are included within Mongoose NPM contained by the package.

```
meteor add activitree:mongoosed2
```

activitree:mongoosed2 exposes the entire mongoose Api only server side as:
```js
import { m } from 'meteor/activitree:mongoosed2'
```
as well as a schema validator similar to SimplSchema({}).validator() for validating data in Meteor methods that call Mongoose functions.

Example schema declaration:

```js
import { m } from 'meteor/activitree:mongoosed2'

export const ContactMongooseSchema = new m.Schema({
    _id: String,
    userId: {type: String, required: true},
    displayName: {type: String, required: true},
    slug: {type: String, required: true}
})
```

Example validation in a method:

```js
import { MongooseSchemaValidator } from 'meteor/activitree:mongoosed2'
import { ValidatedMethod } from 'meteor/mdg:validated-method'

new ValidatedMethod({
    name: 'getInitialContacts',
    validate: new MongooseSchemaValidator({
        limit: Number,
        skip: Number
    }).validator(),
    async run ({ limit, skip }) {
        // method content here
    }
})
```

Simply put, in Mongoose you create a schema, use the schema to build a model, use the model to perform DB operations (see documentation at the top).

The use of this package is demonstrated in this repo based on METEOR@3.0-alpha.18: https://github.com/activitree/mongoosed-demo



TO DO:

* adapt the Mongoose to generate Meteor-like document ids. Now, a “create” method is exported by activitree:mongoosed package in order to generate documents (insert) with the right _id format but would prefer to update Mongoose schema to generate and validated these ids properly. At the moment there is a small issue with relational queries where children of children throw a validation error.
```js
import { create } from 'meteor/activitree:mongoosed2' // use this create to correctly generate Meteor Ids. All other model functions can be used from ```m``` (import { m } from 'meteor/activitree:mongoosed2')
```
* improve MongooseSchemaValidator to correctly validate all the possible schema types and options in Mongoose. 
* for those interested, Mongoose fully supports change streams and will just need to pipe those through the socket to the client. We do not use pub/sub, for the time being we are interested in relational data via methods so if there is any interest for the concept, would be nice to have some code flowing in.
* integrate the existing mongoose tests within the Meteor testing framework.

