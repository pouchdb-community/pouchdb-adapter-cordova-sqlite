// Type definitions for pouchdb-adapter-cordova-sqlite
// TODO: JUST COPIED FROM pouchdb-adapter-websql! Please change to fit the correct plugin implementation!!!

/// <reference types="pouchdb-core" />

// TODO: Fixing this lint error will require a large refactor
/* tslint:disable:no-single-declare-module */

declare namespace PouchDB {
    namespace Core {
        interface DatabaseInfo {
            sqlite_plugin?: boolean;
            websql_encoding?: 'UTF-8' | 'UTF-16';
        }
    }

    namespace AdapterCordovaSqlite {
        interface Configuration
                extends Configuration.LocalDatabaseConfiguration {
            /**
             * Amount in MB to request for storage.
             */
            size?: number;
            adapter: 'cordova-sqlite';
        }
    }

    interface Static {
        new<Content extends {}>(name: string | null,
                                options: AdapterCordovaSqlite.Configuration): Database<Content>;
    }
}

declare module 'pouchdb-adapter-cordova-sqlite' {
    const plugin: PouchDB.Plugin;
    export = plugin;
}
