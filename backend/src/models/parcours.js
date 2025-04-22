module.exports = (sequelize, DataTypes) => {
    const Parcours = sequelize.define('Parcours', {
        id_parcours: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
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

    // Définition des relations
    Parcours.associate = (models) => {
        Parcours.belongsTo(models.Lieu, { 
            foreignKey: 'id_lieu',
            as: 'lieu',
            onDelete: 'CASCADE'
        });
    };

    return Parcours;
};
