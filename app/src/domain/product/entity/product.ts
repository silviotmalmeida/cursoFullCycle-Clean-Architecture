// dependências
import AbstractEntity from "../../shared/entity/abstractEntity";
import NotificationError from "../../shared/notification/notification.error";
import ProductInterface from "./productInterface";

// classe de domínio, herda de AbstractEntity e implementa a interface
export default class Product
  extends AbstractEntity
  implements ProductInterface
{
  // definindo os atributos
  private _name: string;
  private _price: number;

  // definindo o construtor com os atributos mínimos necessários
  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;

    // autovalidação de consistência
    this.validate();
  }

  // getters (somente necessários)
  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  // método de autovalidação de consistência
  validate(): boolean {
    // os atributos são obrigatórios
    // populando o bojeto de notification
    if (this._id.length === 0) {
      this.notification.addError({
        context: "product",
        message: "Id is required",
      });
    }
    if (this._name.length === 0) {
      this.notification.addError({
        context: "product",
        message: "Name is required",
      });
    }
    if (this._price <= 0) {
      this.notification.addError({
        context: "product",
        message: "Price must be greater than zero",
      });
    }

    // se foram encontrados erros, lança exceção
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
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
