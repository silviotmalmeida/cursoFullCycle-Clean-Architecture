// dependências
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import { v4 as uuid } from "uuid";
import Customer from "../../customer/entity/customer";

// service de domínio
export default class OrderService {

  // o método que cria um order e incrementa os rewardPoints de um customer
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }
    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }

  // o método que soma o price total de uma lista de orders
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}
