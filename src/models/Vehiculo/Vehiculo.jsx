import { Schema, model, models } from "mongoose";

const vehiculoReportadoSchema = new Schema({
  placa: {
    type: String,
    trim: true,
  },
  modelo: {
    type: String,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  prioridad: {
    type: String,
    trim: true,
  },
  detalles: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
  },
});

export default models.VehiculoReportado ||
  model("VehiculoReportado", vehiculoReportadoSchema);
