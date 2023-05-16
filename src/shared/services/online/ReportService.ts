import axios from "axios";
import {BACKEND_URL} from "src/shared/constants";

const ReportService =  {
  async reportCliente(ruc: string, year: number ) {
    const response = await axios.get<{total: number, month: string}[]>(`${BACKEND_URL}/api/venta/reporte-cliente`, {
      params: {
        cliente: ruc,
        year
      },
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })

    if (response.status !== 200) {
      return null
    }

    return response.data
  },

  async reportVendedor(name: string, year: number ) {
    const response = await axios.get<{total: number, month: string}[]>(`${BACKEND_URL}/api/venta/reporte-vendedor`, {
      params : {
        seller: name,
        year
      },
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })

    if (response.status !== 200) {
      return null
    }

    return response.data
  }
}

export default ReportService
