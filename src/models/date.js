import mongoose from "mongoose";
import moment from "moment-timezone";

mongoose
  .connect("mongodb://kkm:4214@localhost:27017", {
    dbName: "slack",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to DB"))
  .catch(() => console.log("❌ DB Error"));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  checkInTime: { type: String, default: 0 },
  checkOutTime: { type: String, default: 0 },
});

const User = mongoose.model("User", userSchema);

export default User;
