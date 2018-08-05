var admin = require('./firebaseConfig')
var db = admin.database();
module.exports = {
  listDataFromFirebase: function (dbname, callback) {
    if (!dbname) {
      return callback({
        status: 'Error',
        message: 'Reference DB is required'
      });
    }
    var ref = db.ref(dbname);
    ref.once("value").then(snapshot => {
      return callback(snapshot.val())
    });
  },
  addDataToFirebase: function (dbname, postData, callback) {
    if (!dbname) {
      return callback({
        status: 'Error',
        message: 'Reference is required'
      })
    } else {
      var ref = db.ref(dbname);
      ref.push(postData, function (error) {
        if (error) {
          return callback(error)
        } else {
          return callback({
            status: 'Success',
            message: 'Succefully created'
          })
        }
      })
    }
  },
  updateDataToFirebase: function (dbname, id, postData, callback) {
    if (!dbname) {
      return callback({
        status: 'Error',
        message: 'Reference DB is required'
      });
    }
    if (!id) {
      return callback({
        status: 'Error',
        message: 'ID is required'
      });
    }
    db.ref(dbname + "/" + id).set(postData, function (error) {
      if (error) {
        return callback(error)
      } else {
        return callback({
          status: 'Success',
          message: 'Succefully updated'
        })
      }
    })
  },
  deleteDataToFirebase: function (dbname, id, callback) {
    if (!dbname) {
      return callback({
        status: 'Error',
        message: 'Reference DB is required'
      });
    }
    if (!id) {
      return callback({
        status: 'Error',
        message: 'ID is required'
      });
    }
    db.ref(dbname + "/" + id).once("value").then(snapshot => {
      var exist = snapshot.val();
      if (!exist) {
        return callback({
          status: "Error",
          message: id + " not found"
        })
      } else {
        db.ref(dbname + "/" + id).remove(function (error) {
          sails.log.debug(error)
          if (error) {
            return callback(error)
          } else {
            return callback({
              status: 'Success',
              message: 'Succefully deleted'
            })
          }
        })
      }
    });

  }
}
