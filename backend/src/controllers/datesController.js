import datesModel from "../models/datesModel.js";
 
const datesController = {};
 
datesController.getDates = async (req, res) => {
  try {
    const dates = await datesModel.find().populate("doctor").populate("patient");
    res.json(dates);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las citas", error });
  }
};
 
datesController.insertDate = async (req, res) => {
  const { date, hour, doctor, patient } = req.body;
 
  const newDate = new datesModel({ date, hour, doctor, patient });
 
  try {
    await newDate.save();
    res.json({ message: "Cita guardada exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al guardar la cita", error });
  }
};
 
datesController.updateDate = async (req, res) => {
  const { date, hour, doctor, patient } = req.body;
 
  try {
    const updated = await datesModel.findByIdAndUpdate(
req.params.id,
      { date, hour, doctor, patient },
      { new: true }
    );
    res.json({ message: "Cita actualizada exitosamente", date: updated });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar la cita", error });
  }
};
 
datesController.deleteDate = async (req, res) => {
  try {
await datesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Cita eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la cita", error });
  }
};
 
export default datesController;