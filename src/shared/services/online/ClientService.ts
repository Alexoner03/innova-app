import {IClient} from "src/shared/composables/useClient";
import axios from "axios";
import {BACKEND_URL} from "src/shared/constants";

interface RawClient {
  id_cliente: number
  cliente: string
  direccion: string
  ruc: string
}

const ClientService = {
  async filterClients(type: "name" | "ruc", value: string) {

    try {
      const response = await axios.get<RawClient[]>(`${BACKEND_URL}/api/cliente/filter?type=${type}&value=${value.toLowerCase()}`,{
        headers: {
          "Authorization" :"Bearer "+ localStorage.getItem("token")
        }
      })

      if(response.status !== 200) {
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
    }
    catch (e) {
      return null
    }
  },

  async listAll() {
    try {
      const response = await axios.get<RawClient[]>(`${BACKEND_URL}/api/cliente`,{
        headers: {
          "Authorization" :"Bearer "+ localStorage.getItem("token")
        }
      })

      if(response.status !== 200) {
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
    }catch (e) {
      return null
    }
  }
}

export default ClientService;
