module.exports = (sequelize, DataTypes) => {
	var Alert= sequelize.define('Alert', {
		alert_id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
        },
        watch_id: {
            type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
        },
		field_type: {
			type: DataTypes.STRING,
			allowNull:false,
		},
		operator: {
				allowNull: false,
				type: DataTypes.STRING
		},
		value: {
				allowNull: false,
				type: DataTypes.INTEGER
		}
	},
	{
			 freezeTableName: true,
			 createdAt: 'alert_created',
			 updatedAt: 'alert_updated'
	}
    );
    Alert.associate = models => {
        Alert.belongsTo(models.Watch, {foreignKey: 'watch_id'});
    }
	return Alert;
};