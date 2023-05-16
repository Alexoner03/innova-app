import {IClient} from "src/shared/composables/useClient";
import {db} from "src/shared/db";
import {obtenerHoraActual} from "src/shared/utils";


const ClientServiceOffline = {
  filterClients(type: "name" | "ruc", value: string) {
    if (type === "name") {
      return db.clients
        .filter(x => x.name.toLowerCase().includes(value.toLowerCase()))
        .toArray()
    }

    return db.clients
      .filter(x => x.ruc.toLowerCase().includes(value.toLowerCase()))
      .toArray()
  },

  async saveClients(clients: IClient[]) {
    try {
      await db.clients.clear()
      await db.clients.bulkAdd(clients.map(item => {
        return {
          ...item,
          createdAt: obtenerHoraActual()
        }
      }))

      return true
    } catch (e) {
      console.log(e)
      return false;
    }
  },

  async saveClient(client: IClient) {

    try {
      await db.clients.add(
        {
          ...client,
          createdAt: obtenerHoraActual()
        }
      )

      return true
    } catch (e) {
      console.log(e)
      return false;
    }
  }
}

export default ClientServiceOffline;
