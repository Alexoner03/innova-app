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

    const response = await axios.get<RawClient[]>(`${BACKEND_URL}/api/cliente/filter?type=${type}&value=${value.toLowerCase()}`,{
      headers: {
        "Authorization" : localStorage.getItem("token")
      }
    })

    if(response.status !== 200) {
      return null
    }

    return response.data.map<IClient>(item => {
      return {
        name: item.cliente,
        address: item.direccion,
        ruc: item.ruc
      }
    })
  },

  async listAll() {
    const response = await axios.get<RawClient[]>(`${BACKEND_URL}/api/cliente`,{
      headers: {
        "Authorization" : localStorage.getItem("token")
      }
    })

    if(response.status !== 200) {
      return null
    }

    return response.data.map<IClient>(item => {
      return {
        name: item.cliente,
        address: item.direccion,
        ruc: item.ruc
      }
    })
  }
}

export default ClientService;
