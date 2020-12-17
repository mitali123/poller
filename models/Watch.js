module.exports = (sequelize, DataTypes) => {
	var Watch= sequelize.define('Watch', {
		watch_id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
		},
		zipcode: {
				allowNull: false,
				type: DataTypes.STRING
		}
	},
	{
			 freezeTableName: true,
			 createdAt: 'watch_created',
			 updatedAt: 'watch_updated'
	},
	{
		freezeTableName: true

	},
    );
    Watch.associate = models => {
        Watch.hasMany(models.Alert, { foreignKey: 'watch_id'});
    };
	return Watch;
};