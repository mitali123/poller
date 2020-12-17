'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Alert', {
			alert_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID
            },
			createdAt: {
				field: 'alert_created',
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				field: 'alert_updated',
				allowNull:false,
				type: Sequelize.DATE
			},
			field_type: {
				allowNull: false,
				type: Sequelize.STRING
            },
            operator: {
                allowNull:false,
                type: Sequelize.STRING    
            },
            value: {
                allowNull:false,
                type: Sequelize.INTEGER
            }
		});
	},
	down: (queryInterface, Sequelize) => {
			return queryInterface.dropTable('Watch');
	}
};