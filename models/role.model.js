const { Schema, model } = require("mongoose");

const RoleSchema = Schema(
  {
    rol: {
      type: String,
      required: [true, "Role is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Roles", RoleSchema);
