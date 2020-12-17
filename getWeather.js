const axios = require('axios')
const producer = require('./producer')

module.exports = {
getweather: async function (watch) {
    try{
        
        const zipcode = watch.zipcode;
        const countrycode = 'us';
        const key = '640bf2d41603ef492a1a7b460ace5127'
        const url = "https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=" +
                    zipcode + "," + countrycode + "&appid=" + key;
	const response = await axios.get(url);
	const payloads = producer.getPayload(watch,response.data.main);
        await producer.postMessage(payloads);
        
    }

    catch(e){

    }
}};

//module.exports = { getweather }
