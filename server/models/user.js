var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , bcrypt   = require('bcrypt')
  , userSchema =  new Schema({
    username: String
  , email: {type: String, required: true}
  , password: {type: String, required: true}
  , compGreens: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Green' , dropDups: true} ]
  , pendGreens: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Green', dropDups: true} ]
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
  user.pendGreens.push(green)
  user.save(function(err,user){
    if(err) console.log(err)
    console.log(user)
    return
  })
}
userSchema.methods.finishGreen = function(green,indexGreen){
  var user = this
  user.compGreens.push(green)
  var i = indexGreen;
  if(i != -1) {
  	user.pendGreens.splice(i, 1);
  }
  user.save(function(err,user){
    if(err) console.log(err)
    console.log(user)
    return
  })
}

var User = mongoose.model('User', userSchema)

module.exports = User
