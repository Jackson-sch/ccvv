import { Schema, model, models } from "mongoose";

const workstationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
    hostname: String,
    ip: String,
  },
  {
    timestamps: true,
  }
);

export default models.Workstation || model("Workstation", workstationSchema)