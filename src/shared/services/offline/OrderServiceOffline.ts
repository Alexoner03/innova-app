import {db, Order} from "src/shared/db";

const OrderServiceOffline = {
  async save(order: Order) {
    await db.orders.add(order)
  },

  async list() {
    return db.orders.toArray();
  }
}

export default OrderServiceOffline;
