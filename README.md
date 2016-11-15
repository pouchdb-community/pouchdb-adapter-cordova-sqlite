pouchdb-adapter-cordova-sqlite
======

PouchDB adapter using native Cordova SQLite as its backing store. It works with any one of the following Cordova plugins:

- [Cordova-sqlite-storage](https://github.com/litehelpers/Cordova-sqlite-storage)
- [cordova-plugin-sqlite-2](https://github.com/nolanlawson/cordova-plugin-sqlite-2)
- [cordova-plugin-websql](https://github.com/Microsoft/cordova-plugin-websql)

This adapter looks for a global `cordova.sqlitePlugin`, falling back to `openDatabase` if available. Its adapter name is `'cordova-sqlite'`.

### Usage

#### Via npm/Browserify/Webpack/etc.

Install from npm:

```bash
npm install pouchdb-adapter-cordova-sqlite
```

Then `require()` it, notify PouchDB of the plugin, and initialize a database using the `cordova-sqlite` adapter name:

```js
PouchDB.plugin(require('pouchdb-adapter-cordova-sqlite'));
var db = new PouchDB('mydb.db', {adapter: 'cordova-sqlite'});
```

Note this requires a module bundler such as Browserify, Webpack, etc.

#### Via script tags

If you're not using npm/Browserify/Webpack/etc., just [download the JavaScript file from unpkg](https://unpkg.com/pouchdb-adapter-cordova-sqlite/dist/pouchdb.cordova-sqlite.js), then include it after PouchDB:

```html
<script src="path/to/pouchdb.js"></script>
<script src="path/to/pouchdb.cordova-sqlite.js"></script>
```

Then initialize it using the `cordova-sqlite` adapter name:

```js
var db = new PouchDB('mydb.db', {adapter: 'cordova-sqlite'});
```

This will create a SQLite database via native Cordova called `mydb.db`.

**Note that you will need to do this within the `deviceready` Cordova event**. If you are stuck trying to get this to work, then please refer to the [pouchdb-adapter-cordova-sqlite-demo](https://github.com/nolanlawson/pouchdb-adapter-cordova-sqlite-demo) project which contains a fully working demo that you can try out yourself to see how it should work. The code it adds is simply:

```html
<script src="js/pouchdb-5.4.5.js"></script>
<script src="js/pouchdb.cordova-sqlite.js"></script>
<script>
  document.addEventListener('deviceready', function () {
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

## Historical note

Until PouchDB 6.0.0, PouchDB's regular `websql` adapter supported the Cordova SQLite Plugin automatically. However, the PouchDB team found this
to be confusing, error-prone, and difficult to configure, which is why it was exacted into a separate plugin. You can read details in [PouchDB's list of breaking changes](https://github.com/pouchdb/pouchdb/wiki/Breaking-changes).

## Changelog

- 2.0.0
  - Automatically registered the plugin if it detects `window.PouchDB`. This means for people using `<script>` tags, you no longer need to explicitly call `PouchDB.plugin()`.
- 1.0.0
  - Initial release
