module.exports = (sequelize, DataTypes) => {
    const Lieu = sequelize.define('Lieu', {
      id_lieu: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      },
      adresse: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    });
  
    return Lieu;
  };
  