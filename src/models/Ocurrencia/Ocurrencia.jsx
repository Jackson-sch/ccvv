import { Schema, model, models } from "mongoose";

const ocurrenciaSchema = new Schema(
  {
    descripcion: {
      type: String,
      trim: true,
    },
    clasificacion: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

export default models.Ocurrencia || model("Ocurrencia", ocurrenciaSchema);
