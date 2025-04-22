module.exports = (sequelize, DataTypes) => {
  const Commentaire = sequelize.define('Commentaire', {
      id_comment: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      commentaire: {
          type: DataTypes.TEXT,
          allowNull: false
      },
      date_commentaire: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
      }
  }, {
      timestamps: false, // ✅ Désactiver `createdAt` et `updatedAt`
  });

  Commentaire.associate = models => {
    Commentaire.belongsTo(models.Utilisateur, { 
          foreignKey: 'id_user', 
          as: 'user', // ✅ Alias pour "User"
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });

      Commentaire.belongsTo(models.Evenement, { 
          foreignKey: 'id_event', 
          as: 'event', // ✅ Alias pour "Event"
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });
  };

  return Commentaire;
};
