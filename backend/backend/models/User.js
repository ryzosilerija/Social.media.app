import mongoose from "mongoose";

// Define user schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Export the model
export default mongoose.model("User", UserSchema);
