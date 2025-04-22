module.exports = (sequelize, DataTypes) => {
    const Programme = sequelize.define('Programme', {
      id_program: {
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
      date_heure: {
        type: DataTypes.DATE,
        allowNull: false
      },
      
    id_event: {  // Clé étrangère vers Event
      type: DataTypes.INTEGER,
      allowNull: false
    }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    });
  
    Programme.associate = models => {
      Programme.belongsTo(models.Evenement, { foreignKey: 'id_event' });
    };
  
    return Programme;
  };
  