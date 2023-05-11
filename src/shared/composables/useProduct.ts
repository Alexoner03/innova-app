import {ref} from "vue";
import ProductService from "src/shared/services/online/ProductService";
import ClientServiceOffline from "src/shared/services/offline/ClientServiceOffline";
import ProductServiceOffline from "src/shared/services/offline/ProductServiceOffline";

export interface IProduct {
  product_id: number,
  name: string,
  stock: number,
  unitPrice: number,
  cantByBox: number,
  codigo: string,
  url: string
}

const products = ref<IProduct[]>([])

export const useProduct= () => {
  return {
    products,
    async filterProducts(value: string) {
      const hasConexion = window.navigator.onLine;

      if (hasConexion) {
        const result = await ProductService.searchProduct(value)

        if(result !== null) {
          products.value = result;
        }

        return
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
