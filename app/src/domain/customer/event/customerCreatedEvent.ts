// dependências
import EventInterface from "../../shared/event/eventInterface";

// classe para o event CustomerCreated, implementa a eventInterface
// um event pode conter vários eventHandlers
export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
