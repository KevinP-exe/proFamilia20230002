import { Schema, model } from "mongoose";
 
const doctorSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    maxlength: [50, "El nombre no puede exceder los 50 caracteres"]
  },
  speciality: {
    type: String,
    required: [true, "La especialidad es obligatoria"]
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Por favor ingresa un correo electrónico válido"]
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
  }
}, {
  timestamps: true
});
 
export default model("Doctors", doctorSchema);