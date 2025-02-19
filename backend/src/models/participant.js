module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant', {
      id_participant: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      statut: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date_inscription: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    });
  
    Participant.associate = models => {
      Participant.belongsTo(models.User, { foreignKey: 'id_user' });
      Participant.belongsTo(models.Event, { foreignKey: 'id_event' });
    };
  
    return Participant;
  };
  