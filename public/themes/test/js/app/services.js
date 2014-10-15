'use strict'

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
app.factory('entity', function ($rootScope, $log) {
  var socket = io.connect()
  return {
    save: function (entity, callback) {
      callback(undefined, entity)
    },
    load: function(id, callback) {
      callback(undefined, {id: id})
    }
  }
})
