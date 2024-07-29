import { Schema, model, models } from "mongoose";

const TurnoSchema = new Schema(
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

export default models.Turno || model("Turno", TurnoSchema);
