module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id_event: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id_createur: {  // Clé étrangère vers l'utilisateur
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_lieu: {  // Clé étrangère vers le lieu
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_debut: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_fin: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  });

  // Définition des associations
  Event.associate = function(models) {
    Event.belongsTo(models.User, { foreignKey: 'id_createur', as: 'createur' });  
    Event.belongsTo(models.Lieu, { foreignKey: 'id_lieu', as: 'lieu' });  
    Event.hasMany(models.Program, { foreignKey: 'id_event', as: 'programs' });
    Event.hasMany(models.Media, { foreignKey: 'id_event', as: 'medias' });
    Event.hasMany(models.Catalog, { foreignKey: 'id_event', as: 'catalogs' });
    Event.hasMany(models.Participant, { foreignKey: 'id_event', as: 'participants' });
  };

  return Event;
};
