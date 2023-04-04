// dependências
import EventInterface from "../../@shared/event/eventInterface";

// classe para o event ProductCreated, implementa a eventInterface
// um event pode conter vários eventHandlers
export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
