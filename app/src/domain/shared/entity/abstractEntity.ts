// dependências
import Notification from "../notification/notification";

// classe abstrata reponsável pelo carregamento das notifications
// a ser herdada pelas demais classes de entidades
export default abstract class AbstractEntity {
  // atributos
  protected _id: string;
  public notification: Notification;

  // construtor com atributos mínimos
  constructor() {
    this.notification = new Notification();
  }

  // getters
  get id(): string {
    return this._id;
  }
}
