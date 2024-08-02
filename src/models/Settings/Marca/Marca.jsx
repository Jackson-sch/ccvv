import { Schema, model, models } from "mongoose";

const MarcaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Marca || model("Marca", MarcaSchema)