import * as mongoose from "mongoose";
import { User } from "./authentication.interface";
import * as uniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  age: {
    type: Number,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  height: {
    type: Number,
    require: true,
  },
  weight: {
    type: Number,
    require: true,
  },
  sbp: {
    type: Number,
    require: true,
  },
  dbp: {
    type: Number,
    require: true,
  },
  chol: {
    type: Number,
    require: true,
  },
  trigl: {
    type: Number,
    require: true,
  },
  hdl: {
    type: Number,
    require: true,
  },
  ldl: {
    type: Number,
    require: true,
  },
  smoke: {
    type: Boolean,
    require: true,
  },
  drink: {
    type: Boolean,
    require: true,
  },
  family: {
    type: Boolean,
    require: true,
  },
  risk: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.index({
  username: "text",
});

userSchema.plugin(uniqueValidator, { message: "{VALUE} is already taken." });

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
