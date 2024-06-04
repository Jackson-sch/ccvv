import { Schema, model, models } from "mongoose";

const clasificacionSchema = new Schema(
  {
    descripcion: String,
  },
  {
    timestamps: true,
  }
);

export default models.Clasificacion ||
  model("Clasificacion", clasificacionSchema);
