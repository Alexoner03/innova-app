import axios from "axios";
import {BACKEND_URL} from "src/shared/constants";
import {IAdvacementTemp, IDetail} from "src/shared/composables/useDebt";

export interface IDebt {
  cliente: string,
  fecha: string,
  fechapago: string,
  vendedor: string,
  total: number,
  pendiente: number,
  acuenta: number,
  serieventas: string,
  documento: string
}

export interface IAdvacement {
  fecha: string,
  adelanto: number,
  encargado: string
}

export interface PagedIDebt {
  data: IDebt[],
  next_page_url: string,
  path: string,
  per_page: number,
  prev_page_url: string,
  to: number,
  total: number,
  current_page: number
}

const DebtService = {
  async list(client: string = "") {
    try {
      const response = await axios.get<IDebt[]>(`${BACKEND_URL}/api/venta`, {
        params: {
          cliente: client !== "" ? client : undefined
        },
        headers: {
          "Authorization":  "Bearer "+localStorage.getItem("token")
        }
      })

      if (response.status !== 200) {
        return null
      }

      return response.data;
    }catch (e) {
      return null
    }
  },

  async listSell(client: string = "", page: number = 1) {
    try {
      const response = await axios.get<PagedIDebt>(`${BACKEND_URL}/api/venta?venta=1&page=${page}`, {
        params: {
          cliente: client !== "" ? client : undefined
        },
        headers: {
          "Authorization":  "Bearer "+localStorage.getItem("token")
        }
      })

      if (response.status !== 200) {
        return null
      }

      return response.data;
    }catch (e) {
      return null
    }
  },

  async listAdvacements(serie: string) {
    try {
      const response = await axios.get<IAdvacement[]>(`${BACKEND_URL}/api/venta/adelanto`, {
        params: {
          serie: serie
        },
        headers: {
          "Authorization": "Bearer "+localStorage.getItem("token")
        }
      })

      if (response.status !== 200) {
        return null
      }

      return response.data;
    }catch (e) {
      return null
    }
  },

  async sendAdvacement(advacements: IAdvacementTemp[]) {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/venta/adelanto`,
        {
          adelantos : advacements
        }, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })

      return response.status === 200;
    }catch (e) {
      return false
    }
  },

  async listDetails(serie: string): Promise<IDetail[]> {
    try {
      const response = await axios.get<IDetail[]>(`${BACKEND_URL}/api/venta/detalle`, {
          params: { serie },
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })

      return response.data
    }catch (e) {
      return [];
    }
  },

  getDownloadPDFURL() {
    return `${BACKEND_URL}/api/venta/reporte-deuda?token=${localStorage.getItem("token")}`
  }
}

export default DebtService
