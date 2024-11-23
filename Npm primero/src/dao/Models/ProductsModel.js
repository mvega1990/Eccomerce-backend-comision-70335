import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(paginate);

export const productsModel = mongoose.model("Products", productSchema);
