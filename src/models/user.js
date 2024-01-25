import mongoose from "mongoose";
import bcrypt from "bcrypt";
import moment from "moment";

mongoose
  .connect("mongodb://kkm:4214@localhost:27017", {
    dbName: "slack",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to DB"))
  .catch(() => console.log("❌ DB Error"));

const userSchema = new mongoose.Schema({
  birth: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /\d{4}-\d{2}-\d{2}/.test(value);
      },
    },
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  register_date: {
    type: String,
    default: moment().format("YYYY-MM-DD"),
  },
});

// isModified = 몽구스가 제공하는 메서드
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
