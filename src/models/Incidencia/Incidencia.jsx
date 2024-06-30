import { Schema, model, models } from "mongoose";

const IncidenciaSchema = new Schema(
  {
    fecha: {
      type: String,
      required: true,
    },
    turno: {
      type: String,
      required: true,
    },
    nombres_apellidos: {
      type: String,
      required: true,
      trim: true,
    },
    clasificacion: {
      type: String,
      required: true,
    },
    ocurrencia: {
      type: String,
      required: true,
    },
    operador: {
      type: String,
    },
    hora: {
      type: String,
      required: true,
    },
    camara: {
      type: Number,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    latitud: String,
    longitud: String,
    zona: {
      type: String,
      required: true,
    },
    comisaria: {
      type: String,
    },
    sector_mapa: {
      type: String,
    },
    detalles: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    observaciones: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Incidencias || model("Incidencias", IncidenciaSchema);
