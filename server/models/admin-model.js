import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    name: { type: String, default: "Admin" },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// // a setter
// Comment.path("name").set(function (v) {
//   return capitalize(v);
// });

// // middleware
// Comment.pre("save", function (next) {
//   notify(this.get("email"));
//   next();
// });

const AdminModal = mongoose.model("Admin", AdminSchema);

export default AdminModal;
