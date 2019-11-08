var mongoose = require('mongoose')

// SCHEMA
var addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  pincode: String
})

var contactCardSchema = new mongoose.Schema({
  name: String,
  contact_number: Number
})

var subscriberSchema = new mongoose.Schema({
  email: String,
  timestamp: Date
})

var messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  timestamp: Date
})

// MODELS
var Address = mongoose.model('Address', addressSchema)
var ContactCard = mongoose.model('ContactCard', contactCardSchema)


function initializeUsingMongoObject() {
  var activityCount = mongo.query('Activity', 'countDocuments').then(value => console.log(`Activities: ${value}`))
  var brandCount = mongo.query('Brand', 'countDocuments').then(value => console.log(`Brands: ${value}`))
  var locationCount = mongo.query('Location', 'countDocuments').then(value => console.log(`Locations: ${value}`))

  return Promise.all([activityCount, brandCount, locationCount])
}
// Intial checks 
function intializeDatabase() {
  var activity = new Promise((resolve, reject) => {
    Activity.count({}, function(err, count) {
      if(err)
        reject(err)

      console.log(`Total activities: ${count}`)
      if(count == 0) {
        console.log("Creating a sample activity...")
        
        // Add a new Activity
        var cricket = new Activity({
          name: "Cricket",
          description: "Most popular sports in India",
          tags: ["sports", "outdoor"],
          requirements: ["Ground", "Equipment"]
        })
  
        cricket.save().then(resolve)
      } else 
        resolve()
    })
  })

  var brand = new Promise((resolve, reject) => {
    Brand.count({}, function(err, count) {
      if(err)
        reject(err)
      console.log(`Total brands: ${count}`)
      if(count == 0) {
        console.log("Creating a sample brand")
  
        // Add a new Brand
        var decathlonHelpContactCard = new ContactCard({
          name: "Decathlon Helpdesk",
          contact_number: "01039749237"
        })
  
        var decathlonAddress = new Address({
          street: "Dec Street",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "297502"
        })
  
        Activity.findOne({ name: 'Cricket' }, function(err, activity) {
          if(err) 
            reject(`Could not perform find operation on Activities: ${err}`)
          else {
            var decathlon = new Brand({
              name: "Decathlon",
              owner: "Ms.Decath",
              contact_cards: [decathlonHelpContactCard],
              address: decathlonAddress,
              activities: [activity._id]
            })
            decathlon.save().then(resolve)
            console.log("Brand 'Decathlon' created!")
          }
        })
      } else 
        resolve()
    })
  })

  var location = new Promise((resolve, reject) => {
    Loc.count({}, function(err, count) {
      if(err) 
        reject(err)
      console.log(`Total locations: ${count}`)
      if(count == 0) {
        console.log("Creating a sample location")
  
        // Add a new Location
        var decathlonGroundAddress = new Address({
          street: "Dec Street",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "297502"
        })
  
        Brand.findOne({ name: 'Decathlon' }, function(err, brand) {
          if(err) 
            reject(`Could not perform find operation on Brands: ${err}`)
          else 
            Activity.findOne({ name: 'Cricket' }, function(err, activity) {
              if(err) 
                reject(`Could not perform find operation on Activities: ${err}`)
              else {
                var decathlonCricketGround = new Loc({
                  name: "Decathlon Cricket Ground",
                  brand: brand._id,
                  address: decathlonGroundAddress,
                  activities:[activity._id],
                  ratings: []
                })
                decathlonCricketGround.save().then(resolve)
              }
            })
          
        })
      } else 
        resolve()
    })
  })

  return Promise.all([activity, brand, location])
  

}

// THE STATE OF DB CONNECTION

var mongo = {}
mongo.connected = false
mongo.models = new Map()

mongo.models.set('Address', mongoose.model('Address', addressSchema))
mongo.models.set('ContactCard', mongoose.model('ContactCard', contactCardSchema))
mongo.models.set('Subscriber', mongoose.model('Subscriber', subscriberSchema))
mongo.models.set('Message', mongoose.model('Message', messageSchema))

mongo.query = (model, query, fields = false, selectString = false) => {
  return new Promise((resolve, reject) => {
    if(mongo.connected)
      if(!mongo.models.has(model)) {
        reject('Model requested does not exist in the database')
      } else {
        var qry = mongo.models.get(model)[query]()
        if(fields)
          qry.setOption(fields)
        if(selectString)
          qry.select(selectString)
        qry.exec((err, result) => {
          if(err) 
            reject(`Could not execute the query: ${err}`)
          else
            resolve(result)
        })
      }
    else 
      reject('Not connected to the database')
  })
}

// CONNECTING TO MONGO

mongo.init = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.connection.on('error', err => reject(`Connection error: ${err}`))
    mongoose.connection.once('open', function() {
      console.log('connected to the database!')
      mongo.connected = true
      //initializeUsingMongoObject().then(resolve)
      resolve()
    })
  })
}




module.exports = mongo
