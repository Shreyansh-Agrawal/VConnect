import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the name of CLub"],
    minLength: 3,
    maxLength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide the Club's email"],
    validate: {
      validator: validator.isEmail,
      messsage: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "VIT Chennai",
  },
});

ClubSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

ClubSchema.methods.createJWT = function () {
  return jwt.sign({ clubId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

ClubSchema.methods.comparePassword = async function (clubPassword) {
  const isMatch = await bcrypt.compare(clubPassword, this.password);
  return isMatch;
};

export default mongoose.model("Club", ClubSchema);
