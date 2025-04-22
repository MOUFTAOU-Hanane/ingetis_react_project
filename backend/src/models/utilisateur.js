module.exports = (sequelize, DataTypes) => {
    const Utilisateur = sequelize.define('Utilisateur', {
        id_user: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        mot_de_passe: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'user', 'organisateur'),
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bibliographie: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    });

    // Définition des associations
    Utilisateur.associate = function(models) {
        Utilisateur.hasMany(models.Evenement, { foreignKey: 'id_createur', as: 'events' });  
    };

    return Utilisateur;
};
