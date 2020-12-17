require('dotenv').config();
const app = require('./app');
var kafka = require("kafka-node")
function getKakfkaConfig(){
      kafka_host = process.env.broker1 + ':9092,' + process.env.broker2 + ':9092,' + process.env.broker3 + ':9092';
      Producer = kafka.Producer,
	  client = new kafka.KafkaClient({kafkaHost:kafka_host}),
	  //client = new kafka.KafkaClient(),
      producer = new Producer(client);
      return producer;
    }

function getPayload(watch,data){
    	var watchObj = {};
    	watchObj['watch_id'] = watch.watch_id
        watchObj['user_id'] = watch.user_id
        watchObj['watch_created'] = watch.watch_created
        watchObj['watch_updated'] = watch.watch_updated
        watchObj['zipcode'] = watch.zipcode
    	var payloads = {};
    	var msgs = [];
	for(var j=0; j<watch.alert.length; j++)
	{
		var obj = {};
		watchObj['alert'] = watch.alert[j];
		var publish = {'watch':watchObj,'weather':data};
		KeyedMessage = kafka.KeyedMessage;
		km = new KeyedMessage(watch, JSON.stringify(publish));
		msgs.push(km);
		
	}
	payloads.topic = "weather";
	payloads.messages = msgs;
	return payloads;
}

async function postMessage(payloads){
    	producer = getKakfkaConfig();
    	const kafka_topic = 'weather';
	var payload = [];
	for(var i=0;i<payloads.messages.length;i++){
		var obj = {};
		obj.topic = "weather";
		obj.messages = payloads.messages[i];
		obj.key = i+1;
		payload.push(obj);
	}
	
	producer.on('ready', async function() {
		const end = app.db_oper.startTimer({service: 'kafka'});
		let push_status = await producer.send(payload, (err, data) => {
		if (err) {
			end();
			console.error('[kafka-producer -> '+kafka_topic+']: broker failed');
		} else {
			end();
			app.message_counter.inc({topic: 'weather',type: 'publish'})
			console.log('[kafka-producer publshed message to topic:'+kafka_topic+']-- broker success');
		}
		});
		
	});
}



module.exports = { getPayload,postMessage,getKakfkaConfig }
