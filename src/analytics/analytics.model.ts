import * as mongoose from "mongoose";
import { Analytics } from "./analytics.interface";
import * as uniqueValidator from "mongoose-unique-validator";

const analyticsSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    index: true,
    unique: true,
  },
  analytics: {
    type: Array,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

analyticsSchema.index({
  username: "text",
});

analyticsSchema.plugin(uniqueValidator, {
  message: "{VALUE} is already taken.",
});

const analyticsModel = mongoose.model<Analytics & mongoose.Document>(
  "Analytics",
  analyticsSchema
);

export default analyticsModel;
