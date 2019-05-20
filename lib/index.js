'use strict'

var WebSqlPouchCore = require('pouchdb-adapter-websql-core')
var assign = require('./assign')

/* global cordova, sqlitePlugin, openDatabase */
function createOpenDBFunction (opts) {
  return function (name, version, description, size) {
    if (typeof sqlitePlugin !== 'undefined') {
      // The SQLite Plugin started deviating pretty heavily from the
      // standard openDatabase() function, as they started adding more features.
      // It's better to just use their "new" format and pass in a big ol'
      // options object. Also there are many options here that may come from
      // the PouchDB constructor, so we have to grab those.
      var sqlitePluginOpts = assign({}, opts, {
        name: name,
        version: version,
        description: description,
        size: size
      })
      return sqlitePlugin.openDatabase(sqlitePluginOpts)
    }

    // Traditional WebSQL API
    return openDatabase(name, version, description, size)
  }
}

function CordovaSQLitePouch (opts, callback) {
  var websql = createOpenDBFunction(opts)
  var _opts = assign({
    websql: websql
  }, opts)

  if (typeof cordova === 'undefined' || typeof sqlitePlugin === 'undefined' || typeof openDatabase === 'undefined') {
    console.error(
      'PouchDB error: you must install a SQLite plugin ' +
      'in order for PouchDB to work on this platform. Options:' +
      '\n - https://github.com/nolanlawson/cordova-plugin-sqlite-2' +
      '\n - https://github.com/litehelpers/Cordova-sqlite-storage' +
      '\n - https://github.com/Microsoft/cordova-plugin-websql')
  }

  if ('default' in WebSqlPouchCore && typeof WebSqlPouchCore.default.call === 'function') {
    WebSqlPouchCore.default.call(this, _opts, callback)
  } else {
    WebSqlPouchCore.call(this, _opts, callback)
  }
}

CordovaSQLitePouch.valid = function () {
  // if you're using Cordova, we assume you know what you're doing because you control the environment
  return true
}

// no need for a prefix in cordova (i.e. no need for `_pouch_` prefix
CordovaSQLitePouch.use_prefix = false

function cordovaSqlitePlugin (PouchDB) {
  PouchDB.adapter('cordova-sqlite', CordovaSQLitePouch, true)
}

if (typeof window !== 'undefined' && window.PouchDB) {
  window.PouchDB.plugin(cordovaSqlitePlugin)
}

module.exports = cordovaSqlitePlugin
