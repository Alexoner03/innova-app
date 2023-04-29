import { ref} from "vue";
import {IClient} from "src/shared/composables/useClient";
import {IProduct} from "src/shared/composables/useProduct";

type IProductOrder = IProduct & { cant: number };

const client = ref<IClient | null>(null)
const products = ref<IProductOrder[]>([])
const comment = ref<string>("")

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
    }
  }
}
