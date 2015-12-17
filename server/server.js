var express   =  require('express')
  , app       =  express()
  , logger    =  require('morgan')
  , bodyParser=  require('body-parser')
  , mongoose  =  require('mongoose')
  , apiRouter =  require('./routes/api_routes.js')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

// mongoose.connect('mongodb://eshahla:Elalex22@ds029595.mongolab.com:29595/greenshare', function(err){
 mongoose.connect('mongodb://localhost/greenshare', function(err){
  if(err) return console.log('Cannot connect to DB')
  console.log('Connected to MongoDB!')
})

app.use('/api/v1',apiRouter)
app.listen(3000, function(){
  console.log('API running on port 3000')
})
