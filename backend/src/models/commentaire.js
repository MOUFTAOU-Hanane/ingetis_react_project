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
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    });
  
    Comment.associate = models => {
      Comment.belongsTo(models.User, { foreignKey: 'id_user' });
      Comment.belongsTo(models.Event, { foreignKey: 'id_event' });
    };
  
    return Comment;
  };
  