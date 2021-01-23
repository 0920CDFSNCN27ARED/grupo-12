module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING, 
            allowNull: false
        },
        userName: {
            type: dataTypes.STRING, 
            allowNull: false
        },
        phone: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING, 
            allowNull: false
        },
        password: {
            type: dataTypes.STRING, 
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING, 
            allowNull: false, 
        },
        admin: {
            type: dataTypes.BOOLEAN, 
            allowNull: false, 
        },
        status: {
            type: dataTypes.STRING, 
            allowNull: false,
        },
        shopId: {
            type: dataTypes.INTEGER,
            defaultValue: null
        },
        role: {
            type: dataTypes.STRING, 
            allowNull: false,
        },
        bio: {
            type: dataTypes.STRING
        },
        facebook: {
            type: dataTypes.STRING
        },
        instagram: {
            type: dataTypes.STRING
        },
        twitter: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "Users"
    }

    // User.associate = ({ Shop }) => {
    //     User.belongsTo(Shop, {
    //         through: "shopId"
    //     })
    // };
   
    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.belongsTo(models.Shop, {
            as: "shops",
            foreignKey: "shopId"
        })
    };
    
    return User;
}