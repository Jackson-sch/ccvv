import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  rol: {
    type: String,
  },
  status: {
    type: String,
  },
  phone: {
    type: Number,
  }
},
  {
    timestamps: true,
  });

export default models.User || model("User", userSchema)