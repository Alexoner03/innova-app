import {db} from "src/shared/db";
import {obtenerHoraActual} from "src/shared/utils";
import {IProduct} from "src/shared/composables/useProduct";
import _ from "lodash";


const ProductServiceOffline = {
  async filterProducts(value: string) {
    const result = await db.products
      .filter(x => x.name.toLowerCase().includes(value.toLowerCase()))
      .toArray()

    return _.orderBy(result,['name'],['asc'])
  },

  async saveProductos(products: IProduct[]) {
    try {
      await this.clearTable()
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
  },
  async clearTable () {
    try{
      await db.products.clear()
    }catch (e) {

    }
  }
}

export default ProductServiceOffline;
