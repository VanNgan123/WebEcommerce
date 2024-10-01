import { CartItem } from "../../store/slices/cartSlices";
import axiosProduct from "../axiosProduct";

export const cartsRequest = async ({
  productId,
  quantity,
  color,
  userId,
}: { productId: string; quantity: number; color: string; userId: string }) => {
  try {
    const response = await axiosProduct.post("/carts", {
      productId,
      quantity,
      color,
      userId,
    });

    return response;
  } catch (error) {
    console.error("Error in cartsRequest:", error);
    return null;
  }
};





