const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/Database");

class Professor extends Model {}

/*
{
    "id": "",
    "numeroEmpleado": "",
    "nombres": "",
    "apellidos": "",
    "horasClase": ""
}
*/
Professor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        numeroEmpleado: DataTypes.INTEGER,
        nombres: DataTypes.STRING,
        apellidos: DataTypes.STRING,
        horasClase: DataTypes.INTEGER,
    },
    { sequelize, modelName: "professor" }
);
Professor.sync();
module.exports = { Professor };
