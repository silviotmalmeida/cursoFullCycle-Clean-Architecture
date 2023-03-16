// dependências
import OrderItem from "./orderItem";

// classe de domínio
export default class Order {
  // definindo os atributos
  private _id: string;
  private _customerId: string; // como Customer faz parte de outro agregado, somente vincula o id
  private _items: OrderItem[]; // como OrderItem faz parte do mesmo agregado, vincula o objeto
  private _total: number;

  // definindo o construtor com os atributos mínimos necessários
  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();

    // autovalidação de consistência
    this.validate();
  }

  // getters (somente necessários)
  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  // método de autovalidação de consistência
  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._customerId.length === 0) {
      throw new Error("CustomerId is required");
    }
    if (this._items.length === 0) {
      throw new Error("Items are required");
    }
  }

  // método para alterar os itens da order
  changeItems(items: OrderItem[]): void {
    this._items = items;

    // autovalidação de consistência
    this.validate();

    // recalculando o total
    this._total = this.total();
  }

  // método para cálculo do preço total do pedido
  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }
}
