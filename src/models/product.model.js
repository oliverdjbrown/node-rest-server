const { Schema, model } = require("mongoose");

const ProductSchema = Schema(
  {
    product: {
      type: String,
      required: [true, "Product is required"],
      unique: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: [true, "Category is required"],
    },
    description: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
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
    img: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ProductSchema.methods.toJSON = function () {
  const { state, ...product } = this.toObject();
  return product;
};

module.exports = model("Products", ProductSchema);
