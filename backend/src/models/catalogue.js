module.exports = (sequelize, DataTypes) => {
  const Catalogue = sequelize.define('Catalogue', {
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
    },
    id_event: { // Ajout de la clé étrangère ici !
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  });

  Catalogue.associate = models => {
    Catalogue.belongsTo(models.Evenement, { foreignKey: 'id_event' , as: 'event'});
  };

  
  return Catalogue;
};
