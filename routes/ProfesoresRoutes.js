const express = require("express")
const rutasProfesores = express.Router()

let profesores = []
/*
{
    "id": "",
    "numeroEmpleado": "",
    "nombres": "",
    "apellidos": "",
    "horasClase": ""
}
*/

const rutasValidas = [
    ["GET", "/profesores"],
    ["GET", "/profesores/*"],
    ["POST", "/profesores"],
    ["PUT", "/profesores/*"],
    ["DELETE", "/profesores/*"],
];

rutasProfesores.use((req, res, next) => {
    let rutaEncontrada = false;
    for (const rutaValida of rutasValidas) {
        if (rutaValida[0] == req.method) {
            const originalRoute = rutaValida[1].slice(11);
            const requestRoute = req.originalUrl.slice(11);
            if (
                originalRoute != 0 && requestRoute != 0 ||
                originalRoute == 0 && requestRoute == 0
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

rutasProfesores.get("/", (req, res) => {
    res.status(200).json(profesores);
});

rutasProfesores.get("/:id", (req, res) => {
    const profesorId = req.params.id;
    let profesorEncontrado = null;
    for (const profesor of profesores) {
        if (profesor.id == profesorId) {
            profesorEncontrado = profesor;
        }
    }

    if (profesorEncontrado == null) {
        res.status(404).json({});
    } else {
        res.status(200).json(profesorEncontrado);
    }
});

rutasProfesores.post("/", (req, res) => {

    const {id, numeroEmpleado, nombres, apellidos, horasClase} = req.body;
    if (
        validarId(id) &&
        validarTexto(nombres) &&
        validarTexto(apellidos) &&
        validarNumeroEmpleado(numeroEmpleado) &&
        validarHorasClase(horasClase)
    ) {
        profesores.push({
            id: id,
            nombres: nombres,
            apellidos: apellidos,
            numeroEmpleado: numeroEmpleado,
            horasClase: horasClase,
        });
        res.status(201).json({});
    } else {
        res.status(400).json({});
    }
});

rutasProfesores.put("/:id", (req, res) => {
    const profesorId = req.params.id;
    const {id, nombres, apellidos, numeroEmpleado, horasClase} = req.body;
    if (nombres == null) {
        return res.status(400).json({})
    }
    if (
        validarId(id) &&
        validarTexto(nombres) &&
        validarTexto(apellidos) &&
        validarNumeroEmpleado(numeroEmpleado) &&
        validarHorasClase(horasClase)
    ) {
        profesores = profesores.filter(profesor => {
            if (profesor.id == profesorId) {
                profesor.id = id;
                profesor.nombres = nombres;
                profesor.apellidos = apellidos;
                profesor.numeroEmpleado = numeroEmpleado;
                profesor.horasClase = horasClase;
            }
            return profesor;
        });
        res.status(200).json({});
    } else {
        res.status(400).json({});
    }
});

rutasProfesores.delete("/:id", (req, res) => {
    const profesorId = req.params.id;
    const antigualCantidadDeAlumnos = profesores.length
    profesores = profesores.filter(profesor => {
        if (profesor.id != profesorId) {
            return profesor;
        }
    });
    if (profesores.length == antigualCantidadDeAlumnos) {
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

function validarNumeroEmpleado(numeroEmpleadoAValidar) {
    const regexParaMatricula = new RegExp(/^[0-9]/);
    return regexParaMatricula.test(numeroEmpleadoAValidar) ? numeroEmpleadoAValidar > 0 : false;
}

function validarHorasClase(horasClaseAValidar) {
    return !isNaN(horasClaseAValidar) ? horasClaseAValidar > 0 : false;
}


module.exports = rutasProfesores