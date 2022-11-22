const express = require("express");
const rutasAlumnos = express.Router();

let alumnos = [];
/*
{
    "id": "",
    "nombres": "",
    "apellidos": "",
    "matricula": "",
    "promedio": ""
}
 */

const rutasValidas = [
    ["GET", "/alumnos"],
    ["GET", "/alumnos/*"],
    ["POST", "/alumnos"],
    ["PUT", "/alumnos/*"],
    ["DELETE", "/alumnos/*"],
];

rutasAlumnos.use((req, res, next) => {
    let rutaEncontrada = false;
    for (const rutaValida of rutasValidas) {
        if (rutaValida[0] == req.method) {
            const originalRoute = rutaValida[1].slice(8);
            const requestRoute = req.originalUrl.slice(8);
            if (
                (originalRoute != 0 && requestRoute != 0) ||
                (originalRoute == 0 && requestRoute == 0)
            ) {
                rutaEncontrada = true;
            }
        }
    }
    if (rutaEncontrada) {
        next();
    } else {
        res.status(405).json({});
    }
});

rutasAlumnos.get("/", (req, res) => {
    res.status(200).json(alumnos);
});

rutasAlumnos.get("/:id", (req, res) => {
    const alumnoId = req.params.id;
    let alumnoEncontrado = null;
    for (const alumno of alumnos) {
        if (alumno.id == alumnoId) {
            alumnoEncontrado = alumno;
        }
    }

    if (alumnoEncontrado == null) {
        res.status(404).json({});
    } else {
        res.status(200).json(alumnoEncontrado);
    }
});

rutasAlumnos.post("/", (req, res) => {
    const {id, nombres, apellidos, matricula, promedio} = req.body;
    if (
        validarId(id) &&
        validarTexto(nombres) &&
        validarTexto(apellidos) &&
        validarMatricula(matricula) &&
        validarPromedio(promedio)
    ) {
        alumnos.push({
            id: id,
            nombres: nombres,
            apellidos: apellidos,
            matricula: matricula,
            promedio: promedio,
        });
        res.status(201).json({});
    } else {
        res.status(400).json({});
    }
});

rutasAlumnos.put("/:id", (req, res) => {
    const alumnoId = req.params.id;
    const {id, nombres, apellidos, matricula, promedio} = req.body;

    if (
        validarId(id) &&
        validarTexto(nombres) &&
        validarTexto(apellidos) &&
        validarMatricula(matricula) &&
        validarPromedio(promedio)
    ) {
        alumnos = alumnos.filter((alumno) => {
            if (alumno.id == alumnoId) {
                alumno.id = id;
                alumno.nombres = nombres;
                alumno.apellidos = apellidos;
                alumno.matricula = matricula;
                alumno.promedio = promedio;
            }
            return alumno;
        });
        res.status(200).json({});
    } else {
        res.status(400).json({});
    }
});

rutasAlumnos.delete("/:id", (req, res) => {
    const alumnoId = req.params.id;
    const antigualCantidadDeAlumnos = alumnos.length
    alumnos = alumnos.filter((alumno) => {
        if (alumno.id != alumnoId) {
            return alumno;
        }
    });
    if (alumnos.length == antigualCantidadDeAlumnos) {
        res.status(404).send({})
    } else {
        res.status(200).json({});
    }
});

function validarId(idAValidar) {
    const regexParaId = new RegExp(/^[0-9]/);
    return regexParaId.test(idAValidar) ? idAValidar > 0 : false;
}

function validarTexto(textoAValidar) {
    const regexParaTexto = new RegExp(/^[a-zA-ZÀ-ÿ ]+/);
    return textoAValidar != null ? regexParaTexto.test(textoAValidar) : false;
}

function validarMatricula(matriculaAValidar) {
    const regexParaMatricula = new RegExp(/^A[0-9]/);
    return matriculaAValidar != null ? regexParaMatricula.test(matriculaAValidar) : false;
}

function validarPromedio(promedioAValidar) {
    return !isNaN(promedioAValidar) ? promedioAValidar > 0 : false;
}

module.exports = rutasAlumnos;
