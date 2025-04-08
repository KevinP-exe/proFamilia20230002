import { Schema, model } from "mongoose";
 
const dateSchema = new Schema({
  date: {
    type: Date,
    required: [true, "La fecha es obligatoria"]
  },
  hour: {
    type: String,
    required: [true, "La hora es obligatoria"],
    match: [/^\d{2}:\d{2}$/, "La hora debe tener el formato HH:MM"]
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctors",
    required: [true, "El doctor es obligatorio"]
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patients",
    required: [true, "El paciente es obligatorio"]
  }
}, {
  timestamps: true
});
 
export default model("Dates", dateSchema);