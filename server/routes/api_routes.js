var usersController = require('../controllers/users_controller.js')
  ,greensController = require('../controllers/greens_controller.js')
   ,apiRouter       = require('express').Router()
   ,jwt             = require('jsonwebtoken')
   ,secret          = 'boom'

 apiRouter.route('/users')
  .post(usersController.createUser)
apiRouter.route('/signin')
   .post(usersController.signIn)
 apiRouter.use(function(req,res,next){
  var token = req.body.token || req.param('token') || req.headers['x-access-token']
  if(token){
    jwt.verify(token, secret, function(err,decodedToken){
      if(err) res.json({ message: 'cant authenticate'})
      req.decoded = decodedToken
      next()
    })
  }
    else{
      res.json({message: 'no token found'})
    }

  })

 apiRouter.route('/users/:email')
  .get(usersController.findUser)
  .post(usersController.addGreens)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser)
apiRouter.route('/greens')
  .get(greensController.allGreens)
  .post(greensController.addGreen)
apiRouter.route('/greens/:id')
  .get(greensController.showGreen)

apiRouter.get('/me', function(req, res) {
	res.send(req.decoded);
});
module.exports = apiRouter
