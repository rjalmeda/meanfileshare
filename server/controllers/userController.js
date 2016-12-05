var mongoose = require('mongoose');
var User = mongoose.model('User');
var Friendship = mongoose.model('Friendship');

var bcrypt = require('bcryptjs');
module.exports = (function(){
    return{
        checkUser: function(req,res){
            if(!req.session.user){
                return res.json({success: false, user: null});
            } else if(req.session.user){
                return res.json({success: true, user: req.session.user});
            }
        },
        registerUser: function(req,res){
            User.findOne({username: req.body.username}, function(err,user){
                if(err){
                    return res.json({errors: err, success: false});
                } else if (user){
                    return res.json({success: false});
                } else if (!user){
                    var newUser = new User(req.body);
                    newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
                    newUser.save(function(err1,user1){
                        if(err1){
                            return res.json({errors: err, success: false});
                        } else if (user1){
                            req.session.user = user1;
                            req.session.save();
                            return res.json({success: true, user:user1, session: req.session});
                        }
                    })
                }
            })
        },
        loginUser: function(req,res){
            User.findOne({username: req.body.username}, function(err,user){
                if(err){
                    return res.json({errors: err, success: false});
                } else if (!user){
                    return res.json({success: false})
                } else if (user){
                    if (bcrypt.compareSync(req.body.password, user.password)){
                        req.session.user = user;
                        req.session.save();
                        return res.json({message: "user logged in", success: true, user: user})
                    } else {
                        return res.json({message: "password does not match", success: false, user: null})
                    }
                } else {
                    return res.json({success: false});
                }
            })
        }
    }
})();