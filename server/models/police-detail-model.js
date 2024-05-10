import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PoliceDetailSchema = new Schema(
  {
    name: { type: String, default: "Police 1" },
    phone: { type: String, required: true },
    district: { type: String, required: true },
    ps: { type: String, required: true },
    rank: { type: String, required: true },
  },
  { timestamps: true }
);

// a setter
// PoliceDetailSchema.path("name").set(function (v) {
//   return capitalize(v);
// });

// // middleware
// Comment.pre("save", function (next) {
//   notify(this.get("email"));
//   next();
// });

const PoliceDetailModel = mongoose.model("Policedetail", PoliceDetailSchema);

export default PoliceDetailModel;
