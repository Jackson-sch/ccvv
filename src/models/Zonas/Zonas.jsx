import { Schema, model, models } from "mongoose";

const ZonasSchema = new Schema(
  {
    name: {
      type: String,
      /* required: true, */
      trim: true,
    },
    type: {
      type: String,
      /* required: true, */
      enum: ["polygon"],
    },
    coordinates: {
      type: [[Number]],
      /* required: true, */
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Zonas || model("Zonas", ZonasSchema);
