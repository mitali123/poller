'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Watch', {
			watch_id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID
            },
            
            			user_id: {
				allowNull: false,
				type: Sequelize.UUID
            },
			createdAt: {
				field: 'watch_created',
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				field: 'watch_updated',
				allowNull:false,
				type: Sequelize.DATE,
			},
			zipcode: {
				allowNull: false,
				type: Sequelize.STRING
			}
		});
	},
	down: (queryInterface, Sequelize) => {
			return queryInterface.dropTable('Watch');
	}
};
