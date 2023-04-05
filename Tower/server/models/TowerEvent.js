import mongoose from "mongoose";

const Schema = mongoose.Schema

export const TowerEventSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  name: { type: String, required: true, minLength: 0, maxLength: 100 },
  description: { type: String, required: true, maxLength: 1000 },
  coverImg: { type: String, required: true, maxLength: 100 },
  location: { type: String, required: true, maxLength: 100 },
  capacity: { type: Number, required: true, min: 0, max: 1000000 },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, required: true, enum: ["concert", "convention", "sport", "digital"], default: "event" }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  })

TowerEventSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})