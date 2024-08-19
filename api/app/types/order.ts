interface IOrder {
  paymentMethod: PaymentMethod
  change?: string
  orderNote?: string
  orderItems: string
  orderTotal: number
  orderType: OrderType
  customerId: string
  orderChosenTime: string
  orderReceivingTime: string
}

enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
}

enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}

enum OrderType {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP',
}

enum OrderStatus {
  ORDER_NOT_CONFIRMED = 'ORDER_NOT_CONFIRMED',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
  ORDER_CONFIRMED = 'ORDER_CONFIRMED',
  ORDER_BEING_PREPARED = 'ORDER_BEING_PREPARED',
  ORDER_BOXED = 'ORDER_BOXED',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  ORDER_PICKED_UP = 'ORDER_PICKED_UP',
}

export { IOrder, PaymentStatus, PaymentMethod, OrderType, OrderStatus }
