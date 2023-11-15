const { Schema, model } = require("mongoose");

const CategorySchema = Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      unique: true,
    },
    state: {
      type: Boolean,
      default: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

CategorySchema.methods.toJSON = function () {
  const { state, ...category } = this.toObject();
  return category;
};

module.exports = model("Categories", CategorySchema);
