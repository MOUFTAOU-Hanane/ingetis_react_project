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
      },
      numero_billet: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    });
  
    Participant.associate = models => {
      Participant.belongsTo(models.Utilisateur, { foreignKey: 'id_user' ,as: 'participants',});
      Participant.belongsTo(models.Evenement, { foreignKey: 'id_event' });
    };
  
    return Participant;
  };
  