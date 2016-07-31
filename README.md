pouchdb-adapter-cordova-sqlite
======

PouchDB adapter using either [Cordova-sqlite-storage](https://github.com/litehelpers/Cordova-sqlite-storage) or 
[cordova-plugin-sqlite-2](https://github.com/nolanlawson/cordova-plugin-sqlite-2) or 
[cordova-plugin-websql](https://github.com/Microsoft/cordova-plugin-websql) as its backing store.

As long as there is a global `cordova.sqlitePlugin` (or `openDatabase`) available, this adapter should work. Its adapter name is `'cordova-sqlite'`.

_**Note:** Until v6.0.0, PouchDB's regular `websql` adapter supported the Cordova SQLite Plugin automatically. However, we found this
was confusing, error-prone, and difficult to configure, hence it's been extracted into a separate plugin._

### Usage

```bash
npm install pouchdb-adapter-cordova-sqlite
```

```js
PouchDB.plugin(require('pouchdb-adapter-cordova-sqlite'));
var db = new PouchDB('mydb.db', {adapter: 'cordova-sqlite'});
```

**Not using npm**? Just directly download the bundle file from:

  - [https://npmcdn.com/pouchdb-adapter-cordova-sqlite/dist/pouchdb.cordova-sqlite.js](https://npmcdn.com/pouchdb-adapter-cordova-sqlite/dist/pouchdb-adapter-cordova-sqlite.js)

Then do this:

```js
PouchDB.plugin(PouchAdapterCordovaSqlite);
var db = new PouchDB('mydb.db', {adapter: 'cordova-sqlite'});
```

### Configuration

This will create a SQLite database via native Cordova (in Android or iOS) called `mydb.db`. If you want to use the
legacy `_pouch_mydb.db` format (with the `_pouch_` prefix), then do this:

```js
var cordovaSqlitePlugin = require('pouchdb-adapter-cordova-sqlite');
cordovaSqlitePlugin.use_prefix = true; // use the legacy '_pouch' prefix
PouchDB.plugin(cordovaSqlitePlugin);
var db = new PouchDB('mydb.db', {adapter: 'cordova-sqlite'});
```

You can also pass in any options that are valid for Cordova-sqlite-storage, such as `location`, 
`androidDatabaseImplementation`, etc.:

```js
var db = new PouchDB('mydb.db', {
  adapter: 'cordova-sqlite',
  iosDatabaseLocation: 'Library',
  androidDatabaseImplementation: 2
});
```