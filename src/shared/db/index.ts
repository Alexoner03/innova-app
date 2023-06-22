import Dexie, { Table } from 'dexie';
import {IClient} from "src/shared/composables/useClient";
import {IProduct} from "src/shared/composables/useProduct";
import {IProductOrder} from "src/shared/composables/useOrder";

export interface Order {
  id?: number,
  client: IClient
  comment: string;
  products: IProductOrder[];
  createdAt: string
}

export class LocalDB extends Dexie {
  orders!: Table<Order>;

  clients!: Table<IClient & { createdAt: string, id?: number }>
  products!: Table<IProduct & { createdAt: string, id?: number }>

  constructor() {
    super("innova");

    this.version(2).stores({
      orders: '++id, *client, comment, *products, createdAt',
    });

    this.version(2).stores({
      clients: '++id, client_id, name, ruc, address, createdAt'
    })

    this.version(2).stores({
      products: '++id, product_id, name, stock, unitPrice, promotorPrice, especialPrice, unitarioPrice, cantByBox, codigo, url, marca'
    })
  }
}

export const db = new LocalDB();
