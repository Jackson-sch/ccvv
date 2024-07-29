import { Schema, model, models } from "mongoose";

const GravedadSchema = new Schema(
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

export default models.Gravedad || model("Gravedad", GravedadSchema);
