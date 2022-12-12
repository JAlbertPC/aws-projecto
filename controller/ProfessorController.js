const { Professor } = require("../models/Professor");

function getAllProfessors(req, res) {
    Professor.findAll().then((professors) => res.status(200).json(professors));
}

function getProfessorById(req, res) {
    const professorId = req.params.id;
    Professor.findOne({
        where: {
            id: professorId,
        },
    }).then((professor) => {
        if (professor == null) {
            res.status(404).json({});
        } else {
            res.status(200).json(professor);
        }
    });
}

function createProfessor(req, res) {
    const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;
    if (
        validateText(nombres) &&
        validateText(apellidos) &&
        validateEmployeeNumber(numeroEmpleado) &&
        validateClassHours(horasClase)
    ) {
        Professor.create({
            nombres: nombres,
            apellidos: apellidos,
            numeroEmpleado: numeroEmpleado,
            horasClase: horasClase,
        }).then((response) => {
            res.status(201).json(response);
        });
    } else {
        res.status(400).json({});
    }
}

function updateProfessor(req, res) {
    const professorId = req.params.id;
    const { nombres, apellidos, numeroEmpleado, horasClase } = req.body;
    if (nombres == null) {
        return res.status(400).json({});
    }
    if (
        validateId(professorId) &&
        validateText(nombres) &&
        validateText(apellidos) &&
        validateEmployeeNumber(numeroEmpleado) &&
        validateClassHours(horasClase)
    ) {
        Professor.update(
            {
                nombres: nombres,
                apellidos: apellidos,
                numeroEmpleado: numeroEmpleado,
                horasClase: horasClase,
            },
            {
                where: {
                    id: professorId,
                },
            }
        ).then((response) => res.status(200).json(response));
    } else {
        res.status(400).json({});
    }
}

function deleteProfessor(req, res) {
    const professorId = req.params.id;
    Professor.destroy({
        where: {
            id: professorId,
        },
    }).then((response) => {
        if (response == 0) {
            res.status(404).send({});
        } else {
            res.status(200).json(response);
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

function validateEmployeeNumber(employeeNumber) {
    const regexForEmployeeNumber = new RegExp(/^[0-9]/);
    return regexForEmployeeNumber.test(employeeNumber)
        ? employeeNumber > 0
        : false;
}

function validateClassHours(classHours) {
    return !isNaN(classHours) ? classHours > 0 : false;
}

module.exports = {
    getAllProfessors,
    getProfessorById,
    createProfessor,
    updateProfessor,
    deleteProfessor,
};
