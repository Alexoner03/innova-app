import axios from "axios";
import {BACKEND_URL} from "src/shared/constants";

export interface IDebt {
  cliente: string,
  fecha: string,
  fechapago: string,
  vendedor: string,
  total: number,
  pendiente: number,
  acuenta: number,
  serieventas: string
}

export interface IAdvacement {
  fecha: string,
  adelanto: number,
  encargado: string
}

const DebtService = {
  async list(client: string = "") {
    const response = await axios.get<IDebt[]>(`${BACKEND_URL}/api/venta`, {
      params: {
        cliente: client !== "" ? client : undefined
      },
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })

    if (response.status !== 200) {
      return null
    }

    return response.data;
  },

  async listAdvacements(serie: string) {
    const response = await axios.get<IAdvacement[]>(`${BACKEND_URL}/api/venta/adelanto`, {
      params: {
        serie: serie
      },
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })

    if (response.status !== 200 || response.data.length === 0) {
      return null
    }

    return response.data;
  }
}

export default DebtService
