// dependências
import ProductInterface from "./productInterface";

// classe de domínio, implementando a interface
export default class Product implements ProductInterface {
  // definindo os atributos
  private _id: string;
  private _name: string;
  private _price: number;

  // definindo o construtor com os atributos mínimos necessários
  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;

    // autovalidação de consistência
    this.validate();
  }

  // getters (somente necessários)
  get id(): string {
    return this._id;
  }
  
  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  // método de autovalidação de consistência
  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._price <= 0) {
      throw new Error("Price must be greater than zero");
    }
    return true;
  }

  // método para alteração do name
  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  // método para alteração do price
  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }
}