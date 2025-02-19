    module.exports = (sequelize, DataTypes) => {
        return sequelize.define('User', {
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
            type: DataTypes.ENUM('admin', 'user'),
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
    
    };
    