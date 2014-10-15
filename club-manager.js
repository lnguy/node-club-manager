
var Microservice = require('microservice')
var express = require('express')
var passport = require('passport')
var GoogleStrategy = require('passport-google').Strategy
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var serveStatic = require('serve-static')
var dust = require('dustjs-linkedin')
var fs = require('fs')

var app = express()

app.use(bodyParser())
app.use(methodOverride())
app.use(serveStatic('public/common', {
  'index': false
}))
app.use(passport.initialize())

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
    console.log(profile)
    done(undefined, profile)
  }
))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// var bootstrapTemplate =
//   dust.compile(fs.readFileSync(__dirname + '/public/themes/bootstrap/index.html', 'utf8'), 'bootstrap')
// dust.loadSource(bootstrapTemplate)

function getTheme(req) {
  return req.session && req.session.theme ? req.session.theme : 'test'
}

app.use(function(req, res, next) {
  var theme = getTheme(req)
  serveStatic(__dirname + '/public/themes/'+theme, {
    'index': 'index.html'
  })(req, res, next)
})

app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }))
app.get('/auth/google', passport.authenticate('google'))
app.get('/auth/google/return',
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/' }))


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
