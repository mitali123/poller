const config = require("./config/config")
const api = require("./getWeather");
const app = require("./app")
const watchRoutes = require("./routes/watch.routes");
const controller = require("./controller/watch.controller") 
require('dotenv').config();

function getKakfkaConfig(){
    kafka_host = process.env.broker1 + ':9092,' + process.env.broker2 + ':9092,' + process.env.broker3 + ':9092'
    var kafka = require("kafka-node"),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient({kafkaHost: kafka_host}),

    consumer = new Consumer
        (
            client, 
        [{ 
            topic: "watch", 
            partition: 0,
            maxWaitTimeInMs:300000
           
        }], 
        {
             autoCommit: false
        });
    return consumer;
  }

exports.consumeMessage = () => {
    consumer = getKakfkaConfig();
    const msg = consumer.on("message", function(message) {
      app.message_counter.inc({topic: 'watch',type: 'consume'})
      console.log("Consumer read message from topic:"+message.topic+", partition number:"+message.partition+", message offset id:"+message.offset);
       const watch = JSON.parse(message.value);
        //DELETE SCENARIO CHECK HERE
       if(watch == null){
           controller.delete_watch(message.key);
       }
      else{
            const alert = watch.alerts;
            //INSERT WATCH INTO DB
            controller.create(watch);          
      }

});
} 

exports.getAllWatches = async() => {
//GET WATCHES FROM DB
const watches = await controller.getAllWatches();
if(watches!=null && watches!=undefined && watches.length!=0){
	for(var i=0; i<watches.length; i++){
	    console.log("Running watches for lopp: ",i);
	    const watchObj = {};
	    var alertArr = [];
	    var alertObj = {};
	    watchObj['watch_id'] = watches[i].watch_id
	    watchObj['user_id'] = watches[i].user_id
	    watchObj['watch_created'] = watches[i].watch_created
	    watchObj['watch_updated'] = watches[i].watch_updated
	    watchObj['zipcode'] = watches[i].zipcode
	    
	    const alerts = await controller.getAllAlerts(watches[i].watch_id);
	    watchObj['alert'] = alerts;
	    
	    await api.getweather(watchObj);
	}
}
}

