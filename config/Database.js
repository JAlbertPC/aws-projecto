const { Sequelize } = require("sequelize");
const {
    DATABASE,
    DATABASEUSER,
    DATABASEPASSWORD,
    DATABASEHOST,
    DATABASEDIALECT,
} = require("./enviroment");
const sequelize = new Sequelize(DATABASE, DATABASEUSER, DATABASEPASSWORD, {
    host: DATABASEHOST,
    dialect: DATABASEDIALECT,
});

try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

module.exports = { sequelize };
