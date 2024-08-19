import { Request, Response } from 'express'
import OrderService from './service'

const OrderController = {
  async getAllOrders(req: Request, res: Response) {
    const orders = await OrderService.getAllOrders()
    return res.json({ data: orders })
  },
  async getAllCustomerOrders(req: Request, res: Response) {
    const id = req.params.id
    const customerOrders = await OrderService.getAllCustomerOrders(id)
    return res.json({ data: customerOrders })
  },
  async getOrder(req: Request, res: Response) {
    const id = req.params.id
    const order = await OrderService.getOrder(id)
    return res.json({ data: order })
  },
}

export default OrderController
