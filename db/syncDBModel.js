'use strict';

/*
to run: npm run syncDBModels

Or, from app root directory (without quotes):
'node ./db/syncDBModels.js'
*/

// Note: this will drop the existing database tables (sync({force: true})).

var db = require('../models');
// var db = null;
db.sequelize.sync({force: true}).then(function() {
  db.sequelize.close();
});
