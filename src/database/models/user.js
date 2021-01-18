module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
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
            defaultValue: "default-avatar.png"
        },
        admin: {
            type: dataTypes.BOOLEAN, 
            allowNull: false, 
            defaultValue: false
        },
        status: {
            type: dataTypes.STRING, 
            allowNull: false,
            defaultValue: "active"
        },
        shopId: {
            type: dataTypes.INTEGER,
            defaultValue: null
        },
        role: {
            type: dataTypes.STRING, 
            allowNull: false,
            defaultValue: "buyer"
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
        tableName: "Users",
        timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);
    return User;
}