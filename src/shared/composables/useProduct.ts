import {ref} from "vue";
import ProductService from "src/shared/services/online/ProductService";

export interface IProduct {
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
    }
  }
}
