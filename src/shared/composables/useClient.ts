import {ref} from "vue";
import ClientService from "src/shared/services/online/ClientService";
import ClientServiceOffline from "src/shared/services/offline/ClientServiceOffline";
import {useConfig} from "src/shared/composables/useConfig";

export interface IClient {
  client_id: number,
  name: string,
  ruc: string,
  address: string,

}

const clients = ref<IClient[]>([])
const {offline} = useConfig()

export const useClient = () => {
  return {
    clients,
    async filterClients(type: "name" | "ruc", value: string) {

      const hasConexion = window.navigator.onLine && !offline.value;

      if (hasConexion) {
        const result = await ClientService.filterClients(type, value)

        if(result !== null) {
          clients.value = result
        }

        return
      }

      clients.value = await ClientServiceOffline.filterClients(type, value)
    },

    async syncClients() {
      const result = await ClientService.listAll();

      if(result === null) {
        return false;
      }

      return await ClientServiceOffline.saveClients(result)


    }
  }
}
