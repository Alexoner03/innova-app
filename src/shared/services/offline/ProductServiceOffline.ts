import {IClient} from "src/shared/composables/useClient";
import {db} from "src/shared/db";
import {obtenerHoraActual} from "src/shared/utils";
import {IProduct} from "src/shared/composables/useProduct";


const ProductServiceOffline = {
  async filterProducts(value: string) {

  },

  async saveProductos(products: IProduct[]) {
    try {
      await db.products.clear()
      await db.products.bulkAdd(products.map(item => {
        return {
          ...item,
          createdAt: obtenerHoraActual()
        }
      }))

      return true
    }catch (e) {
      console.log(e)
      return false;
    }
  }
}

export default ProductServiceOffline;
