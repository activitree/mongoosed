import { DDP } from 'meteor/ddp-client'
import { Random } from 'meteor/random'

export const _makeNewID = function (collectionName) {
  const src = collectionName ? DDP.randomStream('/collection/' + collectionName) : Random.insecure
  return src.id()
}
