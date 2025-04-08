import { Schema, model } from "mongoose";
 
const patientSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    maxlength: [50, "El nombre no puede exceder los 50 caracteres"]
  },
  age: {
    type: Number,
    required: [true, "La edad es obligatoria"],
    min: [0, "La edad no puede ser negativa"]
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Correo electrónico no válido"]
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
  },
  phoneNumber: {
    type: String,
    required: [true, "El número de teléfono es obligatorio"],
    match: [/^\d{8}$/, "El número debe tener 8 dígitos"]
  },
  isVerified: {
    type: Boolean,
    required: [true, "El estado de verificación es obligatorio"]
  },
  verificationCode: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});
 
export default model("Patients", patientSchema);