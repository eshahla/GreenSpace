var Green = require('../models/green.js')

function create(req, res){
  console.log("Creating a green:", req.body.green);
  var green = new Green(req.body.green)
  green.save(function(err){
    if(err) res.json({ err: err})
    res.json({ message: 'Green Created!'})
  })
}
function show(req, res){
  console.log("finding a green:", req.params.id);
  Green.findById(req.params.id ,function(err,green){
    if(err) res.json({err: err})
    res.json(green)
  })
}
function all(req, res) {
  console.log("getting all greens");
  Green.find({},function (err, greens) {
    if(err) res.json({err: err})
    res.json(greens)
  })
}
function addUser(req, res){
  console.log('adding green to a user');
  Green.findById(req.params.id ,function(err,green){
    if(err) res.json({err: err})
    res.json(green)
  })
}

module.exports = {
  addGreen: create
,showGreen: show
,allGreens: all
}
