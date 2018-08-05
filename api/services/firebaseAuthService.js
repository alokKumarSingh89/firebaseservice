var admin = require('./firebaseConfig');
var auth = admin.auth();
module.exports = {
  createUser: function (payload, callback) {
    if (payload.email == null || payload.password == null) {
      return callback({
        status: 'Error',
        message: 'For creating record , email and password required'
      })
    }
    auth.createUser(payload)
      .then(function (user) {
        return callback(user)
      })
      .catch(function (error) {
        return callback(error);
      })
  },
  getUserByEmail: function (email, callback) {
    if (email == null) {
      return callback({
        status: 'Error',
        message: 'For retriving user, provide email'
      })
    }
    auth.getUserByEmail()
      .then(function (user) {
        return callback(user.toJSON)
      })
      .catch(function (error) {
        return callback(error)
      })
  }
}
