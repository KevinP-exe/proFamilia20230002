import patientsModel from "../models/patientsModel.js";
 
const patientsController = {};
 
patientsController.getPatients = async (req, res) => {
  try {
    const patients = await patientsModel.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pacientes", error });
  }
};
 
patientsController.insertPatient = async (req, res) => {
  const { name, age, email, password, phoneNumber, isVerified } = req.body;
 
  const newPatient = new patientsModel({ name, age, email, password, phoneNumber, isVerified });
 
  try {
    await newPatient.save();
    res.json({ message: "Paciente guardado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al guardar el paciente", error });
  }
};
 
patientsController.updatePatient = async (req, res) => {
  const { name, age, email, password, phoneNumber, isVerified } = req.body;
 
  try {
    const updated = await patientsModel.findByIdAndUpdate(
req.params.id,
      { name, age, email, password, phoneNumber, isVerified },
      { new: true }
    );
    res.json({ message: "Paciente actualizado exitosamente", patient: updated });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el paciente", error });
  }
};
 
patientsController.deletePatient = async (req, res) => {
  try {
await patientsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Paciente eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el paciente", error });
  }
};
 
export default patientsController;