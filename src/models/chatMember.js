import mongoose from "mongoose";

mongoose
  .connect("mongodb://kkm:4214@localhost:27017", {
    dbName: "slack",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to ChatDB"))
  .catch(() => console.log("❌ ChatDB Error"));

const chatMemberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const ChatMember = mongoose.model("ChatMember", chatMemberSchema);

export default ChatMember;
