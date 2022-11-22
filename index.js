const puerto = 8080
const express = require("express")
const rutasAlumnos = require("./routes/AlumnosRoutes")
const rutasProfesores = require("./routes/ProfesoresRoutes")
const app = express()

app.use(express.json())

//Rutas de alumnos
app.use("/alumnos", rutasAlumnos)

//Rutas de porfesor
app.use("/profesores", rutasProfesores)


app.use((req, res, next) => {
    res.status(404).send(`
        <h1>Error 404</h1>
        <h3>La dirección ingresada no existe</h3>
        <p>${req.method}: ${req.originalUrl}</p>`
    )
})

app.listen(puerto, () => {
    console.log(`El servidor está corriendo en el puerto: ${puerto}`);
    console.log(`URL: http://localhost:${puerto}`);
})

