import {IProduct} from "src/shared/composables/useProduct";
import axios from "axios";

interface RawProduct {
  producto: string
  p_especial: number
  stock_real: number
  id: number
  cant_caja: number
  codigo: string
}

const ProductService = {
  async searchProduct(value: string) {
    const response = await axios.get<RawProduct[]>(`http://innova-backend.test/api/producto/filter?value=${value.toLowerCase()}`,{
      headers: {
        "Authorization" : localStorage.getItem("token")
      }
    })

    if(response.status !== 200) {
      return null
    }

    return response.data.map<IProduct>(item => {
      return {
        codigo: item.codigo,
        name: item.producto,
        cantByBox: item.cant_caja,
        stock: item.stock_real,
        url: "",
        unitPrice: item.p_especial
      }
    })

  }
}

export default ProductService
