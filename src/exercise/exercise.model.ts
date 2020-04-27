import * as mongoose from "mongoose";
import { Exercises } from "./exercise.interface";
import * as uniqueValidator from "mongoose-unique-validator";

const exerciseSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
  },
  exercises: {
    type: Object,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

exerciseSchema.index({
  username: "text",
});

exerciseSchema.plugin(uniqueValidator, {
  message: "{VALUE} is already taken.",
});

const exerciseModel = mongoose.model<Exercises & mongoose.Document>(
  "Exercises",
  exerciseSchema
);

export default exerciseModel;
