import {IClient} from "src/shared/composables/useClient";
import axios, {AxiosError} from "axios";
import {BACKEND_URL} from "src/shared/constants";

interface RawClient {
  id_cliente: number
  cliente: string
  direccion: string
  ruc: string
}

export interface SaveClientDTO {
  ruc: string,
  cliente: string,
  direccion: string,
  telefono: string,
  representante: string,
  nombre_comercial: string,
  zona: string,
  correo: string
}

const ClientService = {
  async filterClients(type: "name" | "ruc", value: string) {

    try {
      const response = await axios.get<RawClient[]>(`${BACKEND_URL}/api/cliente/filter?type=${type}&value=${value.toLowerCase()}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })

      if (response.status !== 200) {
        return null
      }

      return response.data.map<IClient>(item => {
        return {
          client_id: item.id_cliente,
          name: item.cliente,
          address: item.direccion,
          ruc: item.ruc
        }
      })
    } catch (e) {
      return null
    }
  },

  async listAll() {
    try {
      const response = await axios.get<RawClient[]>(`${BACKEND_URL}/api/cliente`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })

      if (response.status !== 200) {
        return null
      }

      return response.data.map<IClient>(item => {
        return {
          client_id: item.id_cliente,
          name: item.cliente,
          address: item.direccion,
          ruc: item.ruc
        }
      })
    } catch (e) {
      return null
    }
  },

  async saveClient(dto: SaveClientDTO) {
    try {

      const response = await axios.post<{ result: boolean, message: string, client: number }>(`${BACKEND_URL}/api/cliente`, {
        ...dto
      }, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })

      if (response.status !== 200) {
        return response.data
      }

      return response.data

    } catch (e) {

      const error = e as AxiosError<{ result: boolean, message: string, client: number }>
      return {
        result: false,
        message: error.response?.data?.message ?? "Error desconocido",
        client: 0
      }

    }
  }
}

export default ClientService;
