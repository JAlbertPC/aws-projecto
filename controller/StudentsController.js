const { Student } = require("../models/Student");

function getStudents(res) {
    Student.findAll().then((students) => res.status(200).json(students));
}

function getStudentById(req, res) {
    const { id } = req.params;
    Student.findOne({
        where: {
            id: id,
        },
    }).then((student) => {
        if (student == null) {
            res.status(404).json({});
        } else {
            res.status(200).json(student);
        }
    });
}

function createStudent(req, res) {
    const { nombres, apellidos, matricula, promedio } = req.body;
    if (
        validateText(nombres) &&
        validateText(apellidos) &&
        validateSchoolEnrollment(matricula) &&
        validateScore(promedio)
    ) {
        Student.create({
            nombres: nombres,
            apellidos: apellidos,
            matricula: matricula,
            promedio: promedio,
        }).then((student) => res.status(201).json(student));
    } else {
        res.status(400).json({});
    }
}

function updateStudent(req, res) {
    const studentId = req.params.id;
    const { nombres, apellidos, matricula, promedio } = req.body;

    if (
        validateId(studentId) &&
        validateText(nombres) &&
        validateText(apellidos) &&
        validateSchoolEnrollment(matricula) &&
        validateScore(promedio)
    ) {
        Student.update(
            {
                nombres: nombres,
                apellidos: apellidos,
                matricula: matricula,
                promedio: promedio,
            },
            {
                where: {
                    id: studentId,
                },
            }
        ).then((student) => res.status(200).json(student));
    } else {
        res.status(400).json({});
    }
}

function deleteStudent(req, res) {
    const studentId = req.params.id;
    Student.destroy({
        where: {
            id: studentId,
        },
    }).then((student) => {
        if (student == 0) {
            res.status(404).send({});
        } else {
            res.status(200).json({});
        }
    });
}

function updateStudentImage(req, res) {
    const { id } = req.params;
    const fileLocation = req.file.location;
    Student.update(
        {
            fotoPerfilUrl: fileLocation,
        },
        {
            where: {
                id: id,
            },
        }
    ).then((student) => {
        if (student != 0) {
            Student.findOne({
                where: {
                    id: id,
                },
            }).then((student) => res.status(200).json(student));
        } else {
            res.status(500).json(student);
        }
    });
}

function validateId(id) {
    const regexForId = new RegExp(/^[0-9]/);
    return regexForId.test(id) ? id > 0 : false;
}

function validateText(text) {
    const regexForText = new RegExp(/^[a-zA-ZÀ-ÿ ]+/);
    return text != null ? regexForText.test(text) : false;
}

function validateSchoolEnrollment(schoolEnrollment) {
    const regexForSchoolEnrollment = new RegExp(/^A[0-9]/);
    return schoolEnrollment != null
        ? regexForSchoolEnrollment.test(schoolEnrollment)
        : false;
}

function validateScore(score) {
    return !isNaN(score) ? score > 0 : false;
}

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    updateStudentImage,
};
