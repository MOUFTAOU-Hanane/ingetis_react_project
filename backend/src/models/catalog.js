module.exports = (sequelize, DataTypes) => {
    const Catalog = sequelize.define('Catalog', {
      id_catalog: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom_catalogue: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    });
  
    Catalog.associate = models => {
      Catalog.belongsTo(models.Event, { foreignKey: 'id_event' });
    };
  
    return Catalog;
  };
  