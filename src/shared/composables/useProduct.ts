import {ref} from "vue";
import ProductService from "src/shared/services/online/ProductService";
import ProductServiceOffline from "src/shared/services/offline/ProductServiceOffline";
import {useConfig} from "src/shared/composables/useConfig";

export interface IProduct {
  product_id: number,
  name: string,
  stock: number,
  unitPrice: number,
  promotorPrice: number,
  especialPrice: number,
  cantByBox: number,
  codigo: string,
  url: string
}

const products = ref<IProduct[]>([])
const {offline} = useConfig()
export const useProduct= () => {
  return {
    products,

    async filterProducts(value: string) {
      const hasConexion = window.navigator.onLine && !offline.value;

      if (hasConexion) {
        const result = await ProductService.searchProduct(value)

        if(result !== null) {
          products.value = result;
        }
        return
      }

      const result = await ProductServiceOffline.filterProducts(value)

      if(result !== null) {
        products.value = result
      }
    },

    async syncProducts() {
      const hasConexion = window.navigator.onLine;

      if (hasConexion) {
        const result = await ProductService.listAll()

        if(result === null) {
          return false;
        }

        return await ProductServiceOffline.saveProductos(result)
      }
    }
  }
}
