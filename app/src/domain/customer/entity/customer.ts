// dependências
import EventDispatcher from "../../shared/event/eventDispatcher";
import CustomerAddressChangedEvent from "../event/customerAddressChangedEvent";
import CustomerCreatedEvent from "../event/customerCreatedEvent";
import Address from "../value-object/address";

// classe de domínio
export default class Customer {
  // definindo os atributos
  private _id: string;
  private _name: string;
  private _eventDispatcher: EventDispatcher;
  private _address!: Address; // vinculado ao objeto de valor Address
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  // definindo o construtor com os atributos mínimos necessários
  constructor(id: string, name: string, eventDispatcher?: EventDispatcher) {
    this._id = id;
    this._name = name;
    if (typeof eventDispatcher !== "undefined") {
      this._eventDispatcher = eventDispatcher;
    }

    // autovalidação de consistência
    this.validate();

    // se for injetado um eventDispatcher, dispara o evento de customerCreated
    if (typeof eventDispatcher !== "undefined") {
      this.launchCustomerCreatedEvent(eventDispatcher);
    }
  }

  // getters (somente necessários)
  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }

  get eventDispatcher(): EventDispatcher {
    return this._eventDispatcher;
  }

  // método de autovalidação de consistência
  validate() {
    // os atributos são obrigatórios
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  // método para alteração do name
  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  // método para alteração do address
  changeAddress(address: Address) {
    this._address = address;

    // se for injetado um eventDispatcher, dispara o evento de customerAddressChanged
    if (typeof this._eventDispatcher !== "undefined") {
      this.launchCustomerAddressChangedEvent(this._eventDispatcher);
    }
  }

  // método para consulta do active
  isActive(): boolean {
    return this._active;
  }

  // método para alteração do active para true
  activate() {
    // se o address estiver vazio, lança uma exceção
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  // método para alteração do active para false
  deactivate() {
    this._active = false;
  }

  // método para incremento dos rewardPoints
  addRewardPoints(points: number) {
    // for fornecido um número negativo de pontos, lança uma exceção
    if (points < 0) {
      throw new Error("Points must be a positive number");
    }

    this._rewardPoints += points;
  }

  // método responsável por notificar ao eventDispatcher o evento customerCreated
  launchCustomerCreatedEvent(eventDispatcher: EventDispatcher) {
    // criando o evento
    const customerCreatedEvent = new CustomerCreatedEvent({});
    // notificando os eventHandlers registrados associados oa evento
    eventDispatcher.notify(customerCreatedEvent);
  }

  // método responsável por notificar ao eventDispatcher o evento customerAddressChanged
  launchCustomerAddressChangedEvent(eventDispatcher: EventDispatcher) {
    // criando o evento
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: this.id,
      name: this.name,
      address: this.address,
    });
    // notificando os eventHandlers registrados associados oa evento
    eventDispatcher.notify(customerAddressChangedEvent);
  }
}
