import {IProduct} from "src/shared/composables/useProduct";
import axios from "axios";
import {BACKEND_URL} from "src/shared/constants";

interface RawProduct {
  producto: string
  p_especial: number,
  p_promotor: number,
  p_unidad: number,
  stock_real: number
  id: number
  cant_caja: number
  codigo: string,
  marca: string,
  p_compra: number
}

export interface History {
  ventas:  HistoryItem[];
  compras: HistoryItem[];
}

export interface HistoryItem {
  fecha:    Date;
  cantidad: number;
  producto: string;
  unitario: number;
  billete?: string;
  proveedor?: string;
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
          unitPrice: item.p_unidad,
          promotorPrice: item.p_promotor,
          especialPrice: item.p_especial,
          unitarioPrice: item.p_unidad,
          marca: item.marca,
          cost: item.p_compra
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
          unitPrice: item.p_unidad,
          promotorPrice: item.p_promotor,
          especialPrice: item.p_especial,
          unitarioPrice: item.p_unidad,
          marca: item.marca,
          cost: item.p_compra
        }
      })
    }catch (e) {
      return  null;
    }
  },

  async getHistory(id: number, cliente: string) {
    try {
      const response = await axios.get<History>(`${BACKEND_URL}/api/producto/history`,{
        headers: {
          "Authorization" :"Bearer "+ localStorage.getItem("token")
        },
        params: {
          id,
          cliente
        }
      })

      if(response.status !== 200) {
        return null
      }

      return response.data
    }catch (e) {
      return null
    }
  }
}

export default ProductService
