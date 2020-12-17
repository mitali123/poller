const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const consumer = require('./consumer')
const producer = require('./producer')
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended : true }))
const db = require("./models/db")
const promClient = require('prom-client');
require('dotenv').config();

db.sequelize.sync();

const message_counter = new promClient.Counter({
  name: 'poller_kafka_message_counter',
  help: 'Poller: keeps count of messages consumed/published on kafka',
  labelNames: ['topic','type']
});

const db_oper = new promClient.Summary({
  name: 'poller_request_timed_calls',
  help: 'Poller: time taken by external services to respond',
  labelNames: ['service']
});

consumer.consumeMessage();

a = process.env.poll;
console.log(a)
 //var thenum = a.replace( /^\D+/g, '');

// var sindex = a.indexOf('"');
// var eindex = a.lastIndexOf('"');
// console.log(eindex)
//  poll = a.substring((sindex+1), eindex);
//  console.log(poll)
// console.log(process.env.poll);
setInterval(consumer.getAllWatches, a);

app.listen(3001, () => {
    console.log("Server is running on port 3001.");
  });

//require("./routes/watch.routes.js")(app);

app.get('/metrics', function (req, res) {
  res.send(
    require('prom-client').register.metrics()
  )
})

app.get('/health', (request, response) => {
     var kafkaClient = producer.getKakfkaConfig();
     const end = db_oper.startTimer({service: 'kafka'});
     kafkaClient.on('ready', function() {
          end();
          console.log("Kafka Producer is connected and ready.");
          db.sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
            response.status(200).send('Connection to Kafka and DB successful');
          })
          .catch(err => {
            console.error('Unable to connect to the database:', err);
            response.status(500).send('Error connecting to DB');
          });
          
      });
  
      kafkaClient.on("error", function(error) {
          console.error('Unable to connect to Kafka:', error);
          response.status(500).send('Error connecting to Kafka');
      });     
})

app.get('/ready', (request, response) => {
     var kafkaClient = producer.getKakfkaConfig();
     const end = db_oper.startTimer({service: 'kafka'});
     kafkaClient.on('ready', function() {
          end();
          console.log("Kafka Producer is connected and ready.");
          db.sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
            response.status(200).send('Connection to Kafka and DB successful');
          })
          .catch(err => {
            console.error('Unable to connect to the database:', err);
            response.status(500).send('Error connecting to DB');
          });
          
      });
  
      kafkaClient.on("error", function(error) {
          console.error('Unable to connect to Kafka:', error);
          response.status(500).send('Error connecting to Kafka');
      });     
})

exports.message_counter = message_counter;
exports.db_oper = db_oper;