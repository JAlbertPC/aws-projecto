const { PORT } = require("./config/enviroment");
const express = require("express");
const app = express();
const { studentsRoutes } = require("./routes/StudentsRoutes");
const { professorsRoutes } = require("./routes/ProfessorsRoutes");

const port = PORT;

app.use(express.json());

//Rutas de alumnos
app.use("/alumnos", studentsRoutes);

//Rutas de porfesor
app.use("/profesores", professorsRoutes);

app.use((req, res, next) => {
    res.status(404).send(`
        <h1>Error 404</h1>
        <h3>La dirección ingresada no existe</h3>
        <p>${req.method}: ${req.originalUrl}</p>`);
});

app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto: ${port}`);
    console.log(`URL: http://localhost:${port}`);
});
