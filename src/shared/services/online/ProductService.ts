import {IProduct} from "src/shared/composables/useProduct";
import axios from "axios";
import {BACKEND_URL} from "src/shared/constants";

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
    try {
      const response = await axios.get<RawProduct[]>(`${BACKEND_URL}/api/producto/filter?value=${value.toLowerCase()}`,{
        headers: {
          "Authorization" :"Bearer "+ localStorage.getItem("token")
        }
      })

      if(response.status !== 200) {
        return null
      }

      return response.data.map<IProduct>(item => {
        return {
          product_id: item.id,
          codigo: item.codigo,
          name: item.producto,
          cantByBox: item.cant_caja,
          stock: item.stock_real,
          url: "",
          unitPrice: item.p_especial
        }
      })
    }catch (e) {
      return null
    }

  },

  async listAll() {
    try {
      const response = await axios.get<RawProduct[]>(`${BACKEND_URL}/api/producto`,{
        headers: {
          "Authorization" :"Bearer "+ localStorage.getItem("token")
        }
      })

      if(response.status !== 200) {
        return null
      }

      return response.data.map<IProduct>(item => {
        return {
          product_id: item.id,
          codigo: item.codigo ? item.codigo.trim() : "",
          name: item.producto,
          cantByBox: item.cant_caja,
          stock: item.stock_real,
          url: "",
          unitPrice: item.p_especial
        }
      })
    }catch (e) {
      return  null;
    }
  }
}

export default ProductService
