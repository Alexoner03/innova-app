import {db, Order} from "src/shared/db";

const OrderServiceOffline = {
  async save(order: Order, id: number | null) {

    if(id !== null) {
      await db.orders.update(id, order)
      return
    }

    await db.orders.add(order)
  },

  async list() {
    return db.orders.toArray();
  },

  async delete(value: number) {
    await db.orders.delete(value)
  }
}

export default OrderServiceOffline;
