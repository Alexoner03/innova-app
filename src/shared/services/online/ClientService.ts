import {IClient} from "src/shared/composables/useClient";
import axios from "axios";

interface RawClient {
  id_cliente: number
  cliente: string
  direccion: string
  ruc: string
}

const ClientService = {
  async filterClients(type: "name" | "ruc", value: string) {

    const response = await axios.get<RawClient[]>(`http://innova-backend.test/api/cliente/filter?type=${type}&value=${value.toLowerCase()}`,{
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
