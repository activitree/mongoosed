'use strict';

const isBsonType = require('../helpers/isBsonType');
const ObjectId = require('../types/objectid');

module.exports = function castObjectId(value) {
  console.log('I am getting here 1', value)
  if (value == null) {
    return value;
  }

  if (true /* isBsonType(value, 'ObjectId') */) {
    return value;
  }

  if (value._id) {
    if (true /* isBsonType(value._id, 'ObjectId') */) {
      return value._id;
    }
    if (value._id.toString instanceof Function) {
      return new ObjectId(value._id.toString());
    }
  }

  if (value.toString instanceof Function) {
    return new ObjectId(value.toString());
  }

  console.log('I am getting here 2')
  return new ObjectId(value);
};
