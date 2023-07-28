import {Order} from "src/shared/db";
import axios from "axios";
import {BACKEND_URL} from "src/shared/constants";

const OrderService = {
  async sendOrder(order: Order): Promise<boolean> {
    const response = await axios.post(`${BACKEND_URL}/api/venta`,
      {
        comment: order.comment ?? "",
        client: order.client.client_id,
        isNewClient: order.client.isNewClient,
        newClientData: order.client.isNewClient ? [order.client.name,order.client.ruc,order.client.address ?? ""] : null,
        products: order.products.map(item => {
          return {
            cant: item.cant,
            id: item.product_id,
            price: item.unitPrice,
          }
        })
      }, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })

    return response.status === 200;
  }
}

export default OrderService
