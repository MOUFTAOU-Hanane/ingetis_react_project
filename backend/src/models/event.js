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
  
    Event.associate = models => {
      Event.belongsTo(models.User, { foreignKey: 'id_createur' });
      Event.belongsTo(models.Lieu, { foreignKey: 'id_lieu' });
    };
  
    return Event;
  };
  