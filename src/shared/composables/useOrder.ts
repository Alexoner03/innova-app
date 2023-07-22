import { ref} from "vue";
import {IClient} from "src/shared/composables/useClient";
import {IProduct} from "src/shared/composables/useProduct";
import {db, Order} from "src/shared/db";
import OrderServiceOffline from "src/shared/services/offline/OrderServiceOffline";
import {obtenerHoraActual} from "src/shared/utils";
import OrderService from "src/shared/services/online/OrderService";

export type IProductOrder = IProduct & { cant: any };

const client = ref<IClient | null>(null)
const products = ref<IProductOrder[]>([])
const isNewClient = ref(false)
const comment = ref<string>("")
const id = ref<number | null>(null)

const clear = () => {
  client.value = null
  comment.value = ""
  products.value = []
  id.value = null;
}

export const enum STATES {
  OK,
  TOTAL_MIN_ERROR,
  CLIENT_ERROR,
  EXCEED_ERROR,

  PRODUCT_LENGTH_ERROR,
  UNKNOWN
}

const addProductEvent = ref<number>(0);
const productTabError = ref<number>(0);
const reloadOrderEvent = ref<number>(0);
const clearEvent = ref<number>(0);

export const useOrder = () => {
  return {
    products,
    client,
    comment,
    addProductEvent,
    productTabError,
    reloadOrderEvent,
    clearEvent,
    isNewClient,
    setClient(_client: IClient) {
      client.value = _client;
    },

    addProduct(product: IProduct): boolean {
      const prodIndex = products.value.findIndex(item => item.name === product.name);

      if (prodIndex === -1) {
        products.value.push({
          ...product,
          cant: null
        })
        addProductEvent.value++;
        return true;
      }

      return false

    },

    removeProduct(product :IProduct) {
      products.value = products.value.filter(item => item.name !== product.name)
    },

    async reset() {

      if(id.value !== null) {
        await OrderServiceOffline.delete(id.value);
      }

      clear()
      clearEvent.value++;
    },

    async saveOrder(): Promise<STATES> {

      if(client.value === null) {
        return STATES.CLIENT_ERROR
      }

      if(products.value.length <= 0) {
        productTabError.value++
        return STATES.PRODUCT_LENGTH_ERROR
      }

      const anyIsZero = products.value.filter(prod => +prod.cant<1)
      const totalOrder = products.value.reduce((previousValue, curr) => previousValue + parseFloat((curr.cant * curr.unitPrice).toFixed(2)),0)

      console.log(anyIsZero.length);

      if(totalOrder <= 0 || anyIsZero.length) {
        productTabError.value++
        return STATES.TOTAL_MIN_ERROR
      }

/*      const sameExcced = products.value.some(item => item.cant > item.stock)
      if(sameExcced) {
        return STATES.EXCEED_ERROR
      }*/

      try {
        await OrderServiceOffline.save({
          comment: comment.value.toString(),
          client: JSON.parse(JSON.stringify(client.value)),
          products: JSON.parse(JSON.stringify(products.value)),
          createdAt: obtenerHoraActual(),
        }, id.value)

        clear()
        return STATES.OK
      }catch (e) {
        console.error(e)
        return STATES.UNKNOWN
      }
    },

    async uploadOrder(): Promise<STATES> {

      if(client.value === null) {
        return STATES.CLIENT_ERROR
      }

      if(products.value.length <= 0) {
        productTabError.value++
        return STATES.PRODUCT_LENGTH_ERROR
      }

      const anyIsZero = products.value.filter(prod => +prod.cant<1)
      const totalOrder = products.value.reduce((previousValue, curr) => previousValue + parseFloat((curr.cant * curr.unitPrice).toFixed(2)),0)

      if(totalOrder <= 0 || anyIsZero.length) {
        productTabError.value++
        return STATES.TOTAL_MIN_ERROR
      }

/*      const sameExcced = products.value.some(item => item.cant > item.stock)
      if(sameExcced) {
        return STATES.EXCEED_ERROR
      }*/

      try {

        const result = await OrderService.sendOrder({
          comment: comment.value.toString(),
          client: JSON.parse(JSON.stringify(client.value)),
          products: JSON.parse(JSON.stringify(products.value)),
          createdAt: obtenerHoraActual(),
        })

        if(!result)
        {
          throw new Error("ERROR GUARDANDO")
        }

        if(id.value !== null)
        {
          await OrderServiceOffline.delete(id.value)
        }

        clear()
        return STATES.OK

      }catch (e) {
        console.error(e)
        return STATES.UNKNOWN
      }
    },

    listAll(){
      return OrderServiceOffline.list()
    },

    loadOrder(order: Order) {
      client.value = {
        client_id: order.client.client_id,
        name: order.client.name,
        address: order.client.address,
        ruc: order.client.ruc,
        isNewClient: order.client.isNewClient
      }
      id.value = order.id as number
      comment.value = order.comment
      products.value = order.products.map<IProductOrder>(item => {
        return {
          product_id: item.product_id,
          name: item.name,
          cant: +item.cant,
          stock: item.stock,
          url: item.url,
          unitPrice: item.unitPrice,
          cantByBox: item.cantByBox,
          codigo: item.codigo,
          especialPrice: item.especialPrice,
          promotorPrice: item.promotorPrice,
          unitarioPrice: item.unitarioPrice,
          marca: item.marca,
          cost: item.cost
        }
      })

      reloadOrderEvent.value++;
    }
  }
}
