module.exports = (sequelize, DataTypes) => {
    const Program = sequelize.define('Program', {
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
  
    Program.associate = models => {
      Program.belongsTo(models.Event, { foreignKey: 'id_event' });
    };
  
    return Program;
  };
  