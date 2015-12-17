var User = require('../models/user.js')
  , Green = require('../models/green.js')
  , jwt = require('jsonwebtoken')
  , secret = 'boom'

function create(req, res){
  var user = new User(req.body.user)
  user.save(function(err){
    if(err) res.json({ err: err})
    res.json({ message: 'User Created!'})
  })
}
function show(req, res){
  User.find({email: req.params.email},function(err,user){
    if(err) res.json({err: err})
    res.json(user)
  })
}
function signIn(req,res){
  User.findOne({ email: req.body.email} , function(err,user){
    if(err) res.json({err: err})
    if(user){
      if(user.authenticate(req.body.password))
        {
          var token = jwt.sign({
            name: user.name,
            email: user.email
          },
          secret,
          {
            expiresInMinutes: 1440
          })

        res.json({token: token, message: "valid user"})
        }
      else
        res.json({ message: "invalid user"})
    }
    else
      res.json({ message: "user not found"})
  })
}
function addGreen(req,res) {
  Green.findById(req.body.greenId, function (err, green) {
    if(err) res.json({err: err})
    User.findOne({email: req.params.email},function(err,user){
      user.adGreen(green)
      if(err) res.json({err: err})
      res.json({message: "green added to user"})
    })
  })
}
module.exports = {
  createUser: create,
  findUser: show,
  signIn: signIn,
  addGreens: addGreen
}
