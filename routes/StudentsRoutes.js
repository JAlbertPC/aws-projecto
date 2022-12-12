const express = require("express");
const { upload } = require("../config/multer");
const {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    updateStudentImage,
} = require("../controller/StudentsController");
const studentsRoutes = express.Router();

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
    ["POST", "/alumnos/*"],
];

studentsRoutes.use((req, res, next) => {
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

studentsRoutes.get("/", (req, res) => {
    getStudents(res);
});

studentsRoutes.get("/:id", (req, res) => {
    getStudentById(req, res);
});

studentsRoutes.post("/", (req, res) => {
    createStudent(req, res);
});

studentsRoutes.post("/:id/fotoPerfil", upload.single("foto"), (req, res) => {
    updateStudentImage(req, res);
});

studentsRoutes.put("/:id", (req, res) => {
    updateStudent(req, res);
});

studentsRoutes.delete("/:id", (req, res) => {
    deleteStudent(req, res);
});

module.exports = { studentsRoutes };
