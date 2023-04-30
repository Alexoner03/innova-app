import { ref} from "vue";
import {IClient} from "src/shared/composables/useClient";
import {IProduct} from "src/shared/composables/useProduct";
import {db} from "src/shared/db";
import OrderServiceOffline from "src/shared/services/offline/OrderServiceOffline";
import {obtenerHoraActual} from "src/shared/utils";

export type IProductOrder = IProduct & { cant: number };

const client = ref<IClient | null>(null)
const products = ref<IProductOrder[]>([])
const comment = ref<string>("")
const id = ref<number | null>(null)

const clear = () => {
  client.value = null
  comment.value = ""
  products.value = []
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

export const useOrder = () => {
  return {
    products,
    client,
    comment,
    addProductEvent,
    setClient(_client: IClient) {
      client.value = _client;
    },

    addProduct(product: IProduct): boolean {
      const prodIndex = products.value.findIndex(item => item.name === product.name);

      if (prodIndex === -1) {
        products.value.push({
          ...product,
          cant: 0
        })
        addProductEvent.value++;
        return true;
      }

      return false

    },

    removeProduct(product :IProduct) {
      products.value = products.value.filter(item => item.name !== product.name)
    },

    reset() {
      clear()
    },

    async saveOrder(): Promise<STATES> {

      if(client.value === null) {
        return STATES.CLIENT_ERROR
      }

      if(products.value.length <= 0) {
        return STATES.PRODUCT_LENGTH_ERROR
      }

      const totalOrder = products.value.reduce((previousValue, curr) => previousValue + parseFloat((curr.cant * curr.unitPrice).toFixed(2)),0)
      if(totalOrder <= 0) {
        return STATES.TOTAL_MIN_ERROR
      }

      const sameExcced = products.value.some(item => item.cant > item.stock)
      if(sameExcced) {
        return STATES.EXCEED_ERROR
      }

      try {
        await OrderServiceOffline.save({
          comment: comment.value.toString(),
          client: JSON.parse(JSON.stringify(client.value)),
          products: JSON.parse(JSON.stringify(products.value)),
          createdAt: obtenerHoraActual()
        })

        clear()
        return STATES.OK
      }catch (e) {
        console.error(e)
        return STATES.UNKNOWN
      }
    },

    listAll(){
      return OrderServiceOffline.list()
    }
  }
}
