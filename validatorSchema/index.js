import mongoose from '../mongoose'
import { validateObjectAgainstMongooseSchema } from './validate'

export class MongooseSchemaValidator {
  constructor (schema = {}) {
    this.schema = schema
  }

  static defineValidationErrorTransform (transform) {
    if (typeof transform !== 'function') {
      throw new Error('MongooseSchema.defineValidationErrorTransform must be passed a function that accepts an Error and returns an Error')
    }
    MongooseSchemaValidator.validationErrorTransform = transform
  }

  validator () {
    return objToTest => {
      const schemaClone = { ...this.schema }
      // console.log({ objToTest, schemaClone })
      validateObjectAgainstMongooseSchema({
        checkObject: objToTest,
        mongooseSchema: new mongoose.Schema(schemaClone),
        checkDate: new Date()
      })
    }
  }
}

MongooseSchemaValidator.defineValidationErrorTransform(error => {
  const ddpError = new Error(error.message)
  ddpError.error = 'validation-error'
  ddpError.details = error.details
  return ddpError
})
