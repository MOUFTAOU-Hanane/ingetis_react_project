module.exports = (sequelize, DataTypes) => {
    const Oeuvre = sequelize.define('Oeuvre', {
      id_oeuvre: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      titre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      prix: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    });
  
    Oeuvre.associate = models => {
      Oeuvre.belongsTo(models.Utilisateur, { foreignKey: 'id_user' , as: 'user'});
    };
  
    return Oeuvre;
  };
  