module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("students", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reg_no: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stclass: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Student
}