//import {Alumno} from "./Modelos/Alumno";
//const alumnoSupremo = require("./Modelos/Alumno");
const applicationPort = 3000
const express = require("express")
const bodyParser = require("body-parser");
const { application } = require("express");
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const alumnos = []
/*
{
    "id": "",
    "nombres": "",
    "apellidos": "",
    "matricula": "",
    "promedio": ""
}
 */

const profesor = []
/*
{
    "id": "",
    "numeroEmpleado": "",
    "nombres": "",
    "apellidos": "",
    "horasClase": ""
}
 */
let index = 0
//Rutas de alumno
app.get("/alumnos", (req, res) => {
    res.json(alumnos)
})
app.get("/alumnos/:id", (req, res) => {
    console.log(req.params)
    res.send(`<h1>hola usuario ${req.params.id}</h1>`)
})

app.post("/alumnos", (req, res) => {
    console.log(req.body)
    alumnos.push({
        id: req.body.id + index,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        matricula: req.body.matricula,
        promedio: req.body.promedio,
    })
    index++
    res.send("<h1>hello</h1>")
})

app.put("/alumnos/:id", (req, res) => {
    res.send("<h1>hello</h1>")
})

app.delete("/alumnos/:id", (req, res) => {
    res.send("<h1>hello</h1>")
})

//Rutas de porfesor
app.get("/profesores", (req, res) => {
    res.send("<h1>hello</h1>")
})
app.get("/profesores/:id", (req, res) => {
    console.log(req.params)
    res.send(`<h1>hola usuario ${req.params.id}</h1>`)
})

app.post("/profesores", (req, res) => {
    res.send("<h1>hello</h1>")
})

app.put("/profesores/:id", (req, res) => {
    res.send("<h1>hello</h1>")
})

app.delete("/profesores/:id", (req, res) => {
    res.send("<h1>hello</h1>")
})


app.listen(applicationPort, () => {
    console.log(`El servidor está corriendo en el puerto: ${applicationPort}`);
    console.log(`URL: http://localhost:${applicationPort}`);
})

