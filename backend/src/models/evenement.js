module.exports = (sequelize, DataTypes) => {
  const Evenement = sequelize.define('Evenement', {
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
    places_initial: {  // Ajout du champ nb_participants
      type: DataTypes.INTEGER,
      allowNull: false
    },
    places_disponible: {  // Ajout du champ nb_participants
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
  Evenement.associate = function(models) {
    Evenement.belongsTo(models.Utilisateur, { foreignKey: 'id_createur', as: 'createur',  onDelete: 'CASCADE', 
      onUpdate: 'CASCADE'  });  
      Evenement.belongsTo(models.Lieu, { foreignKey: 'id_lieu', as: 'lieu',  onDelete: 'CASCADE', 
      onUpdate: 'CASCADE'  });  
      Evenement.hasMany(models.Programme, { foreignKey: 'id_event', as: 'programs' ,  onDelete: 'CASCADE', 
      onUpdate: 'CASCADE' });
      Evenement.hasMany(models.Media, { foreignKey: 'id_event', as: 'medias',  onDelete: 'CASCADE', 
      onUpdate: 'CASCADE'  });
      Evenement.hasMany(models.Catalogue, { foreignKey: 'id_event', as: 'catalogs' ,  onDelete: 'CASCADE', 
      onUpdate: 'CASCADE' });
      Evenement.hasMany(models.Participant, { foreignKey: 'id_event', as: 'participants',  onDelete: 'CASCADE', 
      onUpdate: 'CASCADE'  });
      Evenement.hasMany(models.Commentaire, { foreignKey: 'id_event', as: 'comments' });

  };

  return Evenement;
};
