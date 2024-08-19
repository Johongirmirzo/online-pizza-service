import { PaymentStatus, OrderStatus } from '../../types/order'
import { prisma } from '../../config/prisma'

const OrderService = {
  async getAllOrders() {
    return prisma.order.findMany({ orderBy: [{ created: 'desc' }] })
  },
  async getAllCustomerOrders(customerId: string) {
    return await prisma.order.findMany({
      where: { customerId },
      orderBy: [{ created: 'desc' }],
    })
  },
  async getOrder(id: string) {
    const order = await prisma.order.findUnique({ where: { id } })
    if (order) {
      return order
    } else {
      return []
    }
  },
}

export default OrderService
