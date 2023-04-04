// dependências
import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";
import EventDispatcher from "../../@shared/event/eventDispatcher";

// definindo os atributos mínimos a serem passados para a factory
interface CustomerFactoryProps {
  name: string;
  street?: string;
  number?: number;
  zip?: string;
  city?: string;
  eventDispatcher?: EventDispatcher;
}

// factory para o agregado de customer
export default class CustomerFactory {
  // método para criar sem address, sem eventDispatcher
  public static create(props: CustomerFactoryProps): Customer {
    return new Customer(uuid(), props.name);
  }

  // método para criar com address, sem eventDispatcher
  public static createWithAddress(props: CustomerFactoryProps): Customer {
    const customer = new Customer(uuid(), props.name);
    const address = new Address(
      props.street,
      props.number,
      props.zip,
      props.city
    );
    customer.changeAddress(address);
    return customer;
  }

  // método para criar sem address, com eventDispatcher
  public static createWithEventDispatcher(
    props: CustomerFactoryProps
  ): Customer {
    // se o eventDispatcher não for atribuído, lança exceção
    if (props.eventDispatcher === undefined) {
      throw new Error("EventDispatcher cannot be undefined");
    }
    return new Customer(uuid(), props.name, props.eventDispatcher);
  }

  // método para criar com address, com eventDispatcher
  public static createWithAddressAndEventDispatcher(
    props: CustomerFactoryProps
  ): Customer {
    // se o eventDispatcher não for atribuído, lança exceção
    if (props.eventDispatcher === undefined) {
      throw new Error("EventDispatcher cannot be undefined");
    }

    const customer = new Customer(uuid(), props.name, props.eventDispatcher);
    const address = new Address(
      props.street,
      props.number,
      props.zip,
      props.city
    );
    customer.changeAddress(address);
    return customer;
  }
}
