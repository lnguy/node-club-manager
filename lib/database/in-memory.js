
var uuid = require('uuid')
var _ = require('lodash')

module.exports = function() {

  var ms = this

  var memory = {}

  ms.add({role: 'entity', cmd: 'save'}, function(args, callback) {
    if(args.entity) {
      if(args.entity.id && memory[args.type] && memory[args.entity.id]) {
        memory[args.entity.id] = _.merge(memory[args.entity.id], args.entity)
      } else {
        if(!memory[args.type]) {
          memory[args.type] = {}
        }
        args.entity.id = uuid.v4()
        memory[args.type][args.entity.id] = args.entity
        callback(undefined, args.entity)
      }
      callback(new Error('no entity'), undefined)
    } else {
      callback(new Error('no entity'), undefined)
    }
  })

  ms.add({role: 'entity', cmd: 'get'}, function(args, callback) {
    if(args.id) {
      if(!memory[args.type]) {
        callback(new Error('no such type ' + args.type), undefined)
      }
      if(!memory[args.type][args.id]) {
        callback(new Error('no such entity ' + args.type + ' with id ' + args.id), undefined)
      }
      callback(undefined, memory[args.type][args.id])
    } else {
      callback(new Error('missing id'), undefined)
    }
  })

}
