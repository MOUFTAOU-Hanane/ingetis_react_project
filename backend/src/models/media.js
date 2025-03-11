module.exports = (sequelize, DataTypes) => {
    const Media = sequelize.define('Media', {
      id_media: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      type_media: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url_media: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    });
  
    Media.associate = models => {
      Media.belongsTo(models.Event, { foreignKey: 'id_event' });
    };
  
    return Media;
  };
  