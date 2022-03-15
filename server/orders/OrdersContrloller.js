import Order from "./OrdersModel.js";
import OrderService from "./OrdersService.js";

class OrderController {
  async create(req, res) {
    try {
      const order = await OrderService.create(req.body);
      res.json(order);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async find(req, res) {
    try {
      const order = await OrderService.find(req.query);
      res.json(order);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const orders = await OrderService.getAll();
      return res.json(orders);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const order = await OrderService.getOne(req.params.id);
      return res.json(order);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedOrder = await OrderService.update(req.body);
      return res.json(updatedOrder);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const order = await OrderService.delete(req.params.id);
      return res.json(order);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new OrderController();
