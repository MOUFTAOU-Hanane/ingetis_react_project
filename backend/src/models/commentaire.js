module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
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

  Comment.associate = models => {
      Comment.belongsTo(models.User, { 
          foreignKey: 'id_user', 
          as: 'user', // ✅ Alias pour "User"
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });

      Comment.belongsTo(models.Event, { 
          foreignKey: 'id_event', 
          as: 'event', // ✅ Alias pour "Event"
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
      });
  };

  return Comment;
};
