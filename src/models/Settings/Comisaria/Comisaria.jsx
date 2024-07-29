import { Schema, model, models } from "mongoose";

const ComisariaSchema = new Schema(
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

export default models.Comisaria || model("Comisaria", ComisariaSchema);
