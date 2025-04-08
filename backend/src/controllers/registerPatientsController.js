import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import Patient from "../models/patientsModel.js";
import { config } from "../config.js";
 
const registerPatientsController = {};
 
registerPatientsController.register = async (req, res) => {
  const { name, age, email, password, phoneNumber } = req.body;
 
  try {
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Paciente ya registrado" });
    }
 
    const passwordHash = await bcrypt.hash(password, 10);
 
    const verificationCode = crypto.randomBytes(3).toString("hex").toUpperCase(); 
 
    const newPatient = new Patient({
      name,
      age,
      email,
      password: passwordHash,
      phoneNumber,
      isVerified: false,
      verificationCode
    });
 
    await newPatient.save();
 
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emailClient.email_user,
        pass: config.emailClient.email_pass
      }
    });
 
    const mailOptions = {
      from: `"Clínica Salud" <${config.emailClient.email_user}>`,
      to: email,
      subject: "Código de Verificación de Correo",
      html: `
        <h2>Verifica tu cuenta</h2>
        <p>Gracias por registrarte. Usa el siguiente código para verificar tu cuenta:</p>
        <h3 style="color: #007BFF;">${verificationCode}</h3>
        <p>Este código expirará en 2 horas.</p>
      `
    };
 
    await transporter.sendMail(mailOptions);
 
    res.json({ message: "Paciente registrado. Revisa tu correo para verificar tu cuenta." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al registrar paciente" });
  }
};
 
registerPatientsController.verifyCodeEmail = async (req, res) => {
  const { email, code } = req.body;
 
  try {
    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(404).json({ message: "Paciente no encontrado" });
 
    if (patient.verificationCode !== code.toUpperCase()) {
      return res.status(400).json({ message: "Código inválido" });
    }
 
    patient.isVerified = true;
    patient.verificationCode = null;
    await patient.save();
 
    res.json({ message: "Cuenta verificada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al verificar código" });
  }
};
 
export default registerPatientsController;