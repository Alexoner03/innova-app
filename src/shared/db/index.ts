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

    this.version(1).stores({
      orders: '++id, *client, comment, *products, createdAt',
    });

    this.version(1).stores({
      clients: '++id, name, ruc, address, createdAt'
    })

    this.version(1).stores({
      products: '++id, name, stock, unitPrice, cantByBox, codigo, url'
    })
  }
}

export const db = new LocalDB();
