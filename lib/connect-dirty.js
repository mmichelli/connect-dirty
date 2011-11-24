/*!
 * Connect - Dirty
 * Based on "Connect - Redis" Copyright(c) by 2010 TJ Holowaychuk <tj@vision-media.ca>
 * Mario Michelli mario@edison.no
 * MIT Licensed
 */

var Dirty = require('dirty'),
    path   = require('path'),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;


module.exports = function(connect){

  /**
   * Connect's Store.
   */

  var Store = connect.session.Store;

  /**
   * Initialize DirtyStore with the given `options`.
   *
   * @param {Object} options
   * @api public
   */

  function DirtyStore(options) {
    var self = this;
    options = options || {};
    Store.call(this, options);

    this.dbPath = null == options.dbPath
      ? 'dbs'
      : options.dbPath;

    this.dbFileName = null == options.dbFileName
      ? 'session.dirty'
      : options.dbFileName;

    if(options.db)
    {
      this.db = options.db;
    }
    else
    {
      this.db = Dirty(path.join(this.dbPath,this.dbFileName));
    }

    this.dbLoaded = false;
    this.db.on('load',function(length){
      self.dbLoaded = true;
      self.emit('load', self.db);
    }) ;
  };

  util.inherits(DirtyStore, EventEmitter);
  /**
   * Inherit from `Store`.
   */

  DirtyStore.prototype.__proto__ = Store.prototype;

  DirtyStore.prototype.get = function(key, fn){
    fn(null, this.db.get(key));
  };

  DirtyStore.prototype.length = function(key, fn){
    return this.db.size();
  };

  DirtyStore.prototype.set = function(key, sess, fn){
    this.db.set(key, sess);
    fn(null, true);
  };

  DirtyStore.prototype.destroy = function(key, fn){
   this.db.rm(sid, fn);
  };

  return DirtyStore;
};
