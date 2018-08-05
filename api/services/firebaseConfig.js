var admin = require("firebase-admin");
var serviceAccount = require('../../config/firebase-config.json');
if (admin.apps.length <= 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fir-node-b8241.firebaseio.com'
  });
}
module.exports = admin;
