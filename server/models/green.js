var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , greenSchema =  new Schema({
        title: {type: String, required: true}
      , desc: {type: String, required: true}
      , level: {type: Number, required: true}
      , pic: String
    })


var Green = mongoose.model('Green', greenSchema)

module.exports = Green
