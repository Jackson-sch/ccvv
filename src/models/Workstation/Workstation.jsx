import { Schema, model, models } from "mongoose";

const WorkstationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
    hostname: String,
    ip: String,
  },
  {
    timestamps: true,
  }
);

export default models.Workstation || model("Workstation", WorkstationSchema)