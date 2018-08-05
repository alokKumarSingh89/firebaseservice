/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var FirebaseService = require("../services/firebaseAuthService");
module.exports = {
	create:function(req,res){
        FirebaseService.createUser(req.body,function(result){
            sails.log.debug('result from the firebase response',result);
            res.json(result);
        })
    },
    index:function(req,res){
        FirebaseService.listDataFromFirebase('test',function(result){
            res.json(result);
        })
    },
    delete:function(req,res){
      FirebaseService.deleteDataToFirebase('test',req.body.id,function(result){
        res.json(result)
      })
    }
};
