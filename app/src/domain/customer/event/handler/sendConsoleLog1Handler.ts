// dependências
import EventHandlerInterface from "../../../shared/event/eventHandlerInterface";
import CustomerCreatedEvent from "../customerCreatedEvent";

// classe handler para o event CustomerCreated, implementa a eventHandler
// podem existir vários eventHandlers para um event
export default class SendConsoleLog1Handler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  //método que vai executar as ações após a ocorrência de um evento
  handle(event: CustomerCreatedEvent): void {
    console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    // console.log(`Sending email because ${event.eventData.name} was created`);
  }
}
