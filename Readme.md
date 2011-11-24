
# Connect Dirty

Connect-dirty is a session store backed by [node_dirty](http://github.com/felixge/node-dirty). Requires dirty >= `0.9.4`.

Connect-dirty is a copy of [connect-redis](https://github.com/visionmedia/connect-redis) but for [node_dirty](http://github.com/felixge/node-dirty).

## Installation

    $ npm install connect-dirty

## Options

  - `db` A Dirty database object
  - `dbPath` Path to the database
  - `dbFileName` Database file name
  - ...    Remaining options passed to the dirty `connect.session.Store()` method.

## Usage

    var connect = require('connect')
      , DirtyStore = require('connect-dirty')(connect);

    connect.createServer(
      connect.cookieParser(),
      // 5 minutes
      connect.session({ store: new DirtyStore, secret: 'keyboard cat' })
    );
