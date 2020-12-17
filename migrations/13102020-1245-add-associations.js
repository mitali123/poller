'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

         //Alerts belongsTo Watch
    return queryInterface.addColumn(
      'Alert', // name of Source model
      'watch_id', // name of the key we're adding 
      {
        type: Sequelize.UUID,
        references: {
          model: 'Watch', // name of Source model
          key: 'watch_id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  
  },
  down: (queryInterface, Sequelize) => {

      return queryInterface.removeColumn(
       'Alert', // name of Source model
       'watch_id' // key we want to remove
       );
    
  }
};


//Watch belongsTo User
//Watch hasMany Alert
