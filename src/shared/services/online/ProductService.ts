import {IProduct} from "src/shared/composables/useProduct";

const products = [
  {
    name: 'Martillo',
    stock: 15,
    unitPrice: 24.99,
    cantByBox: 5,
    codigo: 'FRE12',
    url: 'https://picsum.photos/id/237/200/300'
  },
  {
    name: 'Destornillador',
    stock: 20,
    unitPrice: 12.50,
    cantByBox: 10,
    codigo: 'FRE34',
    url: 'https://picsum.photos/id/238/200/300'
  },
  {
    name: 'Sierra circular',
    stock: 5,
    unitPrice: 109.99,
    cantByBox: 1,
    codigo: 'FRE56',
    url: 'https://picsum.photos/id/239/200/300'
  },
  {
    name: 'Pistola de calor',
    stock: 8,
    unitPrice: 49.99,
    cantByBox: 1,
    codigo: 'FRE78',
    url: 'https://picsum.photos/id/240/200/300'
  },
  {
    name: 'Llave ajustable',
    stock: 30,
    unitPrice: 18.75,
    cantByBox: 8,
    codigo: 'FRE90',
    url: 'https://picsum.photos/id/241/200/300'
  },
  {
    name: 'Taladro inalámbrico',
    stock: 7,
    unitPrice: 179.99,
    cantByBox: 1,
    codigo: 'FRE12A',
    url: 'https://picsum.photos/id/242/200/300'
  },
  {
    name: 'Pinzas de presión',
    stock: 12,
    unitPrice: 9.99,
    cantByBox: 6,
    codigo: 'FRE34B',
    url: 'https://picsum.photos/id/243/200/300'
  },
  {
    name: 'Cepillo eléctrico',
    stock: 3,
    unitPrice: 64.50,
    cantByBox: 1,
    codigo: 'FRE56C',
    url: 'https://picsum.photos/id/244/200/300'
  },
  {
    name: 'Cinta métrica',
    stock: 25,
    unitPrice: 6.99,
    cantByBox: 12,
    codigo: 'FRE78D',
    url: 'https://picsum.photos/id/a/200/300'
  },
  {
    name: 'Alicate universal',
    stock: 18,
    unitPrice: 14.25,
    cantByBox: 4,
    codigo: 'FRE90E',
    url: 'https://picsum.photos/id/151/200/300'
  }
]

const ProductService = {
  async searchProduct(value: string) {
      return new Promise<IProduct[]>((resolve, reject) => {
        setTimeout(()=> {
          resolve(products.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) || item.codigo.toLowerCase().includes(value.toLowerCase())
          ))
        },1500)
      })
  }
}

export default ProductService
