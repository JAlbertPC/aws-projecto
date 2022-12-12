const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");

class Student extends Model {}

/*
{
    "id": "",
    "nombres": "",
    "apellidos": "",
    "matricula": "",
    "promedio": "",
    "fotoPerfilUrl": ""
}
 */
Student.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombres: DataTypes.STRING,
        apellidos: DataTypes.STRING,
        matricula: DataTypes.STRING,
        promedio: DataTypes.FLOAT,
        fotoPerfilUrl: DataTypes.STRING,
    },
    { sequelize, modelName: "student" }
);
Student.sync();
module.exports = { Student };
