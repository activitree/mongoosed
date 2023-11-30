import { ClientError } from '../../errors'
import { MongooseSchemaValidator } from '../index'

export const validateObjectAgainstMongooseSchema = ({ checkObject, mongooseSchema, /* currentPath = 'object', */ } = {}) => {
  const checkDate = date => {
    return !isNaN(new Date(date).getTime())
  }
  const errors = []
  const schemaKeys = Object.keys(mongooseSchema.obj)
  Object.keys(checkObject).forEach(k => {
    if (schemaKeys.indexOf(k) === -1) {
      const error = new ClientError(`Key ${k} does not exist in the schema`, 'validation-error')
      error.details = { message: `Key ${k} does not exist in the schema` }
      throw MongooseSchemaValidator.validationErrorTransform(error)
    }
  })
  // Check type of provided values
  for (const key of schemaKeys) {
    const checkObjectType = Array.isArray(checkObject[key]) ? 'array' : typeof checkObject[key]
    const mongoosePath = mongooseSchema.path(key)
    // If path doesn't exist in schema, jump it
    if (!mongoosePath) continue
    const mongooseType = mongoosePath.instance.toLowerCase()
    const mongooseRequired = mongoosePath.isRequired
    let valid = mongooseType === checkObjectType
    if ((checkObject[key] === undefined || checkObject[key] === null) && !mongooseRequired) {
      // If value undefined and path not required, skip validation
      continue
    } else if (!checkObject[key] && mongooseRequired) {
      // If value undefined and path required, save error
      const error = new ClientError(`${key} is required by the schema but got ${checkObject[key]}`, 'validation-error')
      error.details = { message: `${key} is required by the schema but got ${checkObject[key]}` }
      throw MongooseSchemaValidator.validationErrorTransform(error)
    } else if ((checkObjectType === 'string' || checkObject[key]?.toISOString) && mongooseType === 'date') {
      // Check if value is a date disguised as a string
      if (checkDate(checkObject[key])) {
        valid = true
      }
    } else if (checkObjectType === 'object') {
      // If we still have an object, we must have a subschema
      errors.push(
        ...validateObjectAgainstMongooseSchema({
          checkObject: checkObject[key],
          mongooseSchema: mongooseSchema.path(key).schema,
          // currentPath: `${currentPath}.${key}`
        })
      )
      continue
    }
    if (!valid) {
      const error = new ClientError(`${key} should be of type ${mongooseType} but got ${checkObjectType}`, 'validation-error')
      error.details = { message: `${key} should be of type ${mongooseType} but got ${checkObjectType}` }
      throw MongooseSchemaValidator.validationErrorTransform(error)
    }
  }
}
