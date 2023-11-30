import { _makeNewID } from '../utils/makeId'

export const create = (model, doc) => {
  model.create({
    _id: _makeNewID(),
    ...doc
  })
}
