module.exports = (sequelize, DataTypes) => {
    const Favoris = sequelize.define('Favoris', {
      id_favoris: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      
      id_event: { // Ajout de la clé étrangère ici !
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_user: { // Ajout de la clé étrangère ici !
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    });
  
    Favoris.associate = models => {
        Favoris.belongsTo(models.Evenement, { foreignKey: 'id_event' , as: 'event'});
        Favoris.belongsTo(models.Utilisateur, { foreignKey: 'id_user' , as: 'participant'});

    };
  
    
    return Favoris;
  };
  