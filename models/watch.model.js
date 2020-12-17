// module.exports = (sequelize, Sequelize) => {
//     const Watch = sequelize.define('Watch',{
//         watch_id:{
//             type: Sequelize.UUID,
//             primaryKey: true
//         },
//         user_id:{
//             type: Sequelize.UUID
//         },
//         watch_created:{
//             type: 'TIMESTAMP',
//             defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//         },
//         watch_updated:{
//             type: 'TIMESTAMP',
//             defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//         },
//         zipcode:{
//             type: Sequelize.STRING
//         },
//         alerts:{
//             type:Sequelize.JSON
//         }



//     });
//     return Watch;
// };