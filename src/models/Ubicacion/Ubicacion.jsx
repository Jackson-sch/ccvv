import { Schema, model, models } from "mongoose";

const ubicacionSchema = new Schema(
  {
    nombreCamara: {
      type: String,
      required: true,
    },
    numeroCamara:{
      type: String,
      required: true,
    },
    direccion: String,
    latitud: String,
    longitud: String,
    status: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

export default models.Ubicaciones || model("Ubicaciones", ubicacionSchema);