var User = require('../models/user.js')
  , Green = require('../models/green.js')
  , jwt = require('jsonwebtoken')
  , secret = 'boom'

function create(req, res){
  console.log(req.body);
  var user = new User(req.body)
  user.save(function(err,user){
    if(err) res.json({ err: err})
    res.json({ message: 'User Created!'})
  })
}
function show(req, res){
  User.findOne({email: req.decoded.email})
  .populate('compGreens')
  .populate('pendGreens')
  .exec(function(err,user){
    if(err) res.json({err: err})
    res.json(user)
  })
}
function update(req,res) {
  User.findById(req.params.user_id, function(err, user) {

			if (err) res.send(err);

			// set the new user information if it exists in the request
			if (req.body.name) user.name = req.body.name;
			if (req.body.username) user.username = req.body.username;
			if (req.body.password) user.password = req.body.password;

			// save the user
			user.save(function(err) {
				if (err) res.send(err);

				// return a message
				res.json({ message: 'User updated!' });
			});

		});
}
function destroy(req,res){
    User.remove({
    _id: req.params.user_id
  }, function(err, user) {
    if (err) res.send(err);

    res.json({ message: 'Successfully deleted' });
  });
}
function signIn(req,res){
  console.log(req.body);
  User.findOne({ email: req.body.email} , function(err,user){
    if(err) res.json({err: err})
    if(user){
      if(user.authenticate(req.body.password))
        {
          var token = jwt.sign({
            id: user._id,
            email: user.email
          },
          secret,
          {
            expiresInMinutes: 1440
          })

        res.json({token: token, message: "valid user",success: true})
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
    User.findOne({email: req.decoded.email},function(err,user){
      user.adGreen(green)
      if(err) res.json({err: err})
      res.json({message: "green added to user"})
    })
  })
}
function compGreens(req,res) {
  Green.findById(req.body.greenId, function (err, green) {
    if(err) res.json({err: err})
    User.findOne({email: req.decoded.email},function(err,user){
      user.finishGreen(green, req.body.greenIndex)
      if(err) res.json({err: err})
      res.json({message: "completed green item"})
    })
  })
}
module.exports = {
  createUser: create,
  findUser: show,
  signIn: signIn,
  addGreens: addGreen,
  deleteUser: destroy,
  updateUser: update,
  compGreens: compGreens
}
