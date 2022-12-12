const express = require("express");
const {
    getAllProfessors,
    getProfessorById,
    createProfessor,
    updateProfessor,
    deleteProfessor,
} = require("../controller/profesorController");
const professorsRoutes = express.Router();

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

professorsRoutes.use((req, res, next) => {
    let rutaEncontrada = false;
    for (const rutaValida of rutasValidas) {
        if (rutaValida[0] == req.method) {
            const originalRoute = rutaValida[1].slice(11);
            const requestRoute = req.originalUrl.slice(11);
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

professorsRoutes.get("/", (req, res) => {
    getAllProfessors(req, res);
});

professorsRoutes.get("/:id", (req, res) => {
    getProfessorById(req, res);
});

professorsRoutes.post("/", (req, res) => {
    createProfessor(req, res);
});

professorsRoutes.put("/:id", (req, res) => {
    updateProfessor(req, res);
});

professorsRoutes.delete("/:id", (req, res) => {
    deleteProfessor(req, res);
});

module.exports = { professorsRoutes };
