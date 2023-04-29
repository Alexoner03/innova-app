import {IClient} from "src/shared/composables/useClient";

const clients = [
  {
    name: "Compañía Minera Antamina S.A. Offline",
    ruc: "20437357201",
    address: "Carretera Central Km 299, San Marcos, Áncash"
  },
  {
    name: "Telefónica del Perú S.A.A. Offline",
    ruc: "20100105081",
    address: "Av. Arequipa 1155, Santa Beatriz, Lima"
  },
  {
    name: "Gloria S.A. Offline",
    ruc: "20100066603",
    address: "Av. Argentina 4793, Callao"
  },
  {
    name: "Backus y Johnston S.A.A. Offline",
    ruc: "20100052241",
    address: "Av. Nicolas Arriola 480, San Luis, Lima"
  },
  {
    name: "Refinería La Pampilla S.A.A. Offline",
    ruc: "20100120966",
    address: "Av. Elmer Faucett s/n, Callao"
  },
  {
    name: "Banco de Crédito del Perú Offline",
    ruc: "20100047218",
    address: "Av. Juan de Arona 893, San Isidro, Lima"
  },
  {
    name: "InRetail Perú Corp S.A. Offline",
    ruc: "20506336271",
    address: "Av. Paseo de la República 3220, San Isidro, Lima"
  },
  {
    name: "Southern Copper Corporation Offline",
    ruc: "20100067281",
    address: "Av. Los Faisanes 182, San Isidro, Lima"
  },
  {
    name: "Luz del Sur S.A.A. Offline",
    ruc: "20100054147",
    address: "Av. Paseo de la República 3066, San Isidro, Lima"
  },
  {
    name: "Cementos Pacasmayo S.A.A. Offline",
    ruc: "20100118877",
    address: "Carretera Panamericana Norte Km 662, Pacasmayo, La Libertad"
  }
];

const ClientServiceOffline = {
  async filterClients(type: "name" | "ruc", value: string) {
    return new Promise<IClient[]>((resolve, reject) => {
      if (type === "name") {
        resolve(clients.filter(item => item.name.toLowerCase().includes(value.toLowerCase())))
        return
      }
      resolve(clients.filter(item => item.ruc.toLowerCase().includes(value.toLowerCase())))
    })
  }
}

export default ClientServiceOffline;
