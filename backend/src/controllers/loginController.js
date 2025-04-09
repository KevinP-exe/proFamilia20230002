import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import Doctors from "../models/doctorsModel.js";
import Patients from "../models/patientsModel.js";

import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let userFound;
        let userType;

        // 1- ADMIN
        if (email === config.email.email && password === config.email.password) {
            userType = "admin";
            userFound = { _id: "admin" };
        } else {
            // 2- DOCTOR
            userFound = await Doctors.findOne({ email });
            userType = "doctor";

            if (!userFound) {
                // 3- PACIENTE
                userFound = await Patients.findOne({ email });
                userType = "patient";
            }
        }

        // USUARIO NO ENCONTRADO
        if (!userFound) {
            console.log("El usuario no ha sido encontrado");
            return res.json({ message: "User not found" });
        }

        // Validar la contraseña, solo si no es admin
        if (userType !== "admin") {
            const isMatch = await bcryptjs.compare(password, userFound.password);
            if (!isMatch) {
                return res.json({ message: "Contraseña incorrecta" });
            }
        }

        // TOKEN
        jsonwebtoken.sign(
            // 1- Qué voy a guardar
            { id: userFound._id, userType },
            // 2- Secreto
            config.JWT.secret,
            // 3- Cuando expira
            { expiresIn: config.JWT.expiresIn },
            // 4- Función flecha
            (error, token) => {
                if (error) console.log(error);

                res.cookie("authToken", token);
                res.json({ message: "Login successful" });
            }
        );

    } catch (error) {
        res.json({ message: "Error: " + error });
    }
};

export default loginController;
