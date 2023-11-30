Package.describe({
  name: 'activitree:mongoosed2',
  summary: 'Put Mongoose inside Meteor V2 Server. No exposure on the client.',
  version: '0.0.1',
  git: 'https://github.com/activitree/mongoosed.git'
})

Npm.depends({
  // bson: '6.2.0',
  bson: '5.5.1',
  kareem: '2.5.1',
  // mongodb: '6.2.0',
  mongodb: '5.9.0',
  mpath: '0.9.0',
  mquery: '5.0.0',
  ms: '2.1.3',
  sift: '16.0.1'
})

Package.onUse(api => {
  api.versionsFrom(['2.12'])
  api.use([
    'ecmascript',
    'mongo',
    'mdg:validated-method@1.3.0'
  ], 'server')
  api.mainModule('index.js', ['server'])
})
