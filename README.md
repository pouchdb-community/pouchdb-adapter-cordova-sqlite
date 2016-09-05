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

**Not using npm?** Just directly download the bundle file from:

  - [https://unpkg.com/pouchdb-adapter-cordova-sqlite/dist/pouchdb.cordova-sqlite.js](https://unpkg.com/pouchdb-adapter-cordova-sqlite/dist/pouchdb.cordova-sqlite.js)

Then do this:

```js
PouchDB.plugin(PouchAdapterCordovaSqlite);
var db = new PouchDB('mydb.db', {adapter: 'cordova-sqlite'});
```

This will create a SQLite database via native Cordova called `mydb.db`.

**Note that you will need to do this within the `deviceready` Cordova event**. If you are stuck trying to get this to work, then please refer to the [pouchdb-adapter-cordova-sqlite-demo](https://github.com/nolanlawson/pouchdb-adapter-cordova-sqlite-demo) project which contains a fully working demo that you can try out yourself to see how it should work. The code it adds is simply:

```html
<script src="js/pouchdb-5.4.5.js"></script>
<script src="js/pouchdb.cordova-sqlite.js"></script>
<script>
  document.addEventListener('deviceready', function () {
    PouchDB.plugin(PouchAdapterCordovaSqlite);
    var db = new PouchDB('database.db', {adapter: 'cordova-sqlite'});
    db.post({}).then(function (res) {
      return db.get(res.id);
    }).then(function (doc) {
      alert('stored a document! ' + JSON.stringify(doc));
      alert('adapter is: ' + db.adapter);
    }).catch(console.log.bind(console));
  });
</script>
```

### Configuration

You can also pass in any options that are valid for Cordova-sqlite-storage, such as `location`, 
`androidDatabaseImplementation`, etc.:

```js
var db = new PouchDB('mydb.db', {
  adapter: 'cordova-sqlite',
  iosDatabaseLocation: 'Library',
  androidDatabaseImplementation: 2
});
```

If you want to use the legacy `_pouch_mydb.db` format (with the `_pouch_` prefix), then do this:

```js
var PouchAdapterCordovaSqlite = require('pouchdb-adapter-cordova-sqlite');
cordovaSqlitePlugin.use_prefix = true; // use the legacy '_pouch' prefix
PouchDB.plugin(PouchAdapterCordovaSqlite);
var db = new PouchDB('mydb.db', {adapter: 'cordova-sqlite'});
```
