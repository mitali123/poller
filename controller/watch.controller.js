const db = require("../models/db");
const Watch = db.watch;
const Alert = db.alert;
const Op = db.Sequelize.Op;

exports.create = (req) => {
    console.log("API call to poller");
    const watch = {
        watch_id: req.watch_id,
        user_id: req.user_id,
        watch_created: new Date(req.watch_created),
        watch_updated: new Date(req.watch_updated),
        zipcode: req.zipcode
    };
    Watch.upsert(watch)
    .then(
        data => {
            console.log("Watch Created/Updated");
        },

    ).catch(err => console.error("error:"+err));

    Alert.destroy({where:{watch_id:req.watch_id}})
    const alertArray = req.alerts;
    for(var item=0;item<alertArray.length;item++){
        const alert = {
            watch_id: req.watch_id,
            alert_id: alertArray[item].alert_id,
            field_type: alertArray[item].field_type,
            operator: alertArray[item].operator,
            value: alertArray[item].value,
            alert_created: alertArray[item].alert_created,
            alert_updated: alertArray[item].alert_updated
        }
        Alert.upsert(alert)
        .then(
            data => {
                console.log("Alert Created/Updated");
            },
        ).catch(err => console.error("error:"+err));

    }


};

exports.getAllWatches = () => {
    return Watch.findAll()
    .then(
        (watches) => {
            return watches;
        },  
        (error) => {
            console.error("Error");
        }
    )
}

exports.getAllAlerts = (watchId) => {
    return Alert.findAll({where:{watch_id:watchId}})
    .then(
        (alerts) => {
            return alerts;
        },
        (error) => {
            console.log(error)
        }
    )
}


exports.delete_watch = (watchId) => {
    Watch.destroy({ where: { watch_id: watchId} })
             .then(result => {
                console.log("Watch Deleted");
            })
            .catch(err => {
              console.error(err.message);
            })
  }

exports.getWatches = () => {
    return Watch.findAll()
    .then(
        (watches) => {
                    var allWatches = [];
                    var watchObj = {};
                    console.log(watches.length)
                    for(var i=0; i<watches.length; i++){
                        var alertArr = [];
                        var alertObj = {};
                        console.log(watches[i].user_id);
                        return Alert.findAll({where:{watch_id: watches[i].watch_id}})
                        .then(
                            (alerts) => {
                                for(var j=0; j<alerts.length; j++){
                                    alertObj['alert_id'] = alerts[j].alert_id;
                                    alertObj['watch_id'] = alerts[j].watch_id;
                                    alertObj['alert_created'] = alerts[j].alert_created;
                                    alertObj['alert_updated'] = alerts[j].alert_updated;
                                    alertObj['field_type'] = alerts[j].field_type;
                                    alertObj['operator'] = alerts[j].operator;
                                    alertObj['value'] = alerts[j].value;
                                    alertArr.push(alertObj);
                                }
                                watchObj['watch_id'] = watches[i].watch_id
                                watchObj['user_id'] = watches[i].user_id
                                watchObj['watch_created'] = watches[i].watch_created
                                watchObj['watch_updated'] = watches[i].watch_updated
                                watchObj['zipcode'] = watches[i].zipcode
                                watchObj['alerts'] = alertObj
                                allWatches.push(watchObj);
                                alertObj = {}
                                watchObj = {}
                             },
                        ).catch(err => console.log("error:"+err));

                }
                console.log('I AM HERE');
                return allWatches;
        },
    ).catch(err => console.log("error:"+err));
    return allWatches;

}