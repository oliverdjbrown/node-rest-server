const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    img: {
      type: String,
    },
    rol: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      default: true,
    },
    google: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.toJSON = function () {
  const { _id, password, ...user } = this.toObject();
  return { uid: _id.toString(), ...user };
};

module.exports = model("Users", UserSchema);
