import { MongooseSchemaValidator } from './validatorSchema'
import mongoose from './mongoose/index'
import { create } from './crud/create'

module.exports = { MongooseSchemaValidator, m: mongoose, create }

// In a server file eg. imports/api/server, connect Mongoose to the ROOT_URL or default local DB: mongoose.connect(process.env.MONGO_URL)
// This connection can always becalled from anywhere as mongoose.connection (https://mongoosejs.com/docs/connections.html#multiple_connections)
// When a model is created, other connections can be initialized with const newConn = mongoose.createConnection(uri).

// Meteor default second DB connection:
/*
const uri = Meteor.isProduction ? process.env.MONGO_CONTACTS_URL : 'mongodb://127.0.0.1:3001/meteor'
const _driver = new MongoInternals.RemoteCollectionDriver(uri, {})
const Contacts = new Meteor.Collection('contacts', { _driver })
* */

// With Mongoosed:

/*
const uri = Meteor.isProduction ? process.env.MONGO_CONTACTS_URL : 'mongodb://127.0.0.1:3001/meteor'
newConn = mongoose.createConnection(uri)
Use this connection to initialize Models.
*/
