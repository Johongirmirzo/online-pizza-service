import { OrderStatus } from "~/types/order";

export const getOrderStatus = (status: OrderStatus) => {
    switch (status) {
      case "ORDER_NOT_CONFIRMED":
        return "Not Confirmed";
      case "ORDER_CANCELLED":
        return "Cancelled";
      case "ORDER_CONFIRMED":
        return "Confirmed";
      case "ORDER_BEING_PREPARED":
        return "Being Prepared";
      case "ORDER_BOXED":
        return "Boxed";
      case "ORDER_DELIVERED":
        return "Delivered";
      case "ORDER_PICKED_UP":
        return "Picked Up";
    }
  };
  