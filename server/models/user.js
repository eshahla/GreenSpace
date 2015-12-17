var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , bcrypt   = require('bcrypt')
  , userSchema =  new Schema({
    name: String
  , email: {type: String, required: true}
  , password: {type: String, required: true}
  , compGreens: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Green'} ]
  , pendGreens: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Green'} ]
    })

userSchema.pre('save',function(next){
  var user = this
    , hash = bcrypt.hashSync(user.password, 8)
    user.password = hash
    user.compGreens = [{}]
   next()
})
userSchema.methods.authenticate = function(password){
  var user = this
  return bcrypt.compareSync(password, user.password)
}
userSchema.methods.adGreen = function(green){
  var user = this
  user.prepGreens.push(green)
  user.save(function(err,user){
    if(err) console.log(err)
    console.log(user)
    return
  })
}
userSchema.methods.finishGreen = function(green){
  var user = this
  user.compGreens.push(green)
  user.save(function(err,user){
    if(err) console.log(err)
    console.log(user)
    return
  })
}

var User = mongoose.model('User', userSchema)

module.exports = User
