import doctorsModel from "../models/doctorsModel.js";
 
const doctorsController = {};
 
// SELECT
doctorsController.getDoctors = async (req, res) => {
  try {
    const doctors = await doctorsModel.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los doctores", error });
  }
};
 
// INSERT
doctorsController.insertDoctor = async (req, res) => {
  const { name, speciality, email, password } = req.body;
 
  const newDoctor = new doctorsModel({ name, speciality, email, password });
 
  try {
    await newDoctor.save();
    res.json({ message: "Doctor guardado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al guardar el doctor", error });
  }
};
 
// DELETE
doctorsController.deleteDoctor = async (req, res) => {
  try {
await doctorsModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el doctor", error });
  }
};
 
// UPDATE
doctorsController.updateDoctor = async (req, res) => {
  const { name, speciality, email, password } = req.body;
 
  try {
    const updatedDoctor = await doctorsModel.findByIdAndUpdate(
req.params.id,
      { name, speciality, email, password },
      { new: true }
    );
    res.json({ message: "Doctor actualizado exitosamente", doctor: updatedDoctor });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el doctor", error });
  }
};
 
export default doctorsController;