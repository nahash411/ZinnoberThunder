//
// Exports:
// 
// Org
//  .addOrg( name )  -->  returns true
//  .addUserToOrg( username, orgName, isAdmin )  -->  returns true
//

var mongoose = require('mongoose');

var orgSchema = mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  users: { type: Array },
  admins: { type: Array }
});

var Org = mongoose.model('Org', orgSchema);

module.exports = Org;

module.exports.addOrg = function (name) {

  // addOrg('HR')

  // Returning true - should this be something else?

  var newOrg = new Org({
    name: name,
    users: [],
    admins: []
  });

  newOrg.save(function (err, newOrg) {
    if (err) {
      throw err;
    } else {
      return true;
    }
  });
};

module.exports.addUserToOrg = function (username, orgName, isAdmin) {

  // Returning true;

  var org = Org.findOne({ name: orgName }).exec(function (err, found) {
    if (err) {
      throw err;
    } else {
      if (isAdmin) {
        found.admins.push(username);
      } else {
        found.users.push(username);
      }
      found.save(function (error, result) {
        if (error) {
          throw error;
        } else {
          return true;
        }
      })
    }
  });
};
