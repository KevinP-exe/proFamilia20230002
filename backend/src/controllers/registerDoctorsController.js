import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";
import doctorsModel from "../models/doctorsModel.js";
 
const registerDoctorsController = {};
 
registerDoctorsController.register = async (req, res) => {
  const { name, speciality, email, password } = req.body;
 
  try {
    // Verificar si el doctor ya existe
    const existingDoctor = await doctorsModel.findOne({ email });
    if (existingDoctor) {
      return res.json({ message: "Doctor ya registrado" });
    }
 
    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);
 
    // Crear nuevo doctor
    const newDoctor = new doctorsModel({
      name,
      speciality,
      email,
      password: passwordHash
    });
    
    await newDoctor.save();
 
    // Firmar token
    jsonwebtoken.sign(
      { id: newDoctor._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) return console.log(error);
        res.cookie("authToken", token);
        res.json({ message: "Doctor registrado exitosamente" });
      }
    );
 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al registrar el doctor" });
  }
};
 
export default registerDoctorsController;