import {reactive, ref} from "vue";
import ClientService from "src/shared/services/online/ClientService";
import ClientServiceOffline from "src/shared/services/offline/ClientServiceOffline";

export interface IClient {
  name: string,
  ruc: string,
  address: string,

}

const clients = ref<IClient[]>([])


export const useClient = () => {
  return {
    clients,
    async filterClients(type: "name" | "ruc", value: string) {

      const hasConexion = window.navigator.onLine;

      if (hasConexion) {
        clients.value = await ClientService.filterClients(type, value)
        return
      }

      clients.value = await ClientServiceOffline.filterClients(type, value)
    }
  }
}
