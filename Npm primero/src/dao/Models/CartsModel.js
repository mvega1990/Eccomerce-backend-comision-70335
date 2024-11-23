import mongoose from "mongoose";

export const cartsModel = mongoose.model(
  "Carts",
  new mongoose.Schema(
    {
      products: {
        type: [
          {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Products",
            },
            quantity: Number,
          },
        ],
      },
    },
    {
      timestamps: true,
    }
  )
);
