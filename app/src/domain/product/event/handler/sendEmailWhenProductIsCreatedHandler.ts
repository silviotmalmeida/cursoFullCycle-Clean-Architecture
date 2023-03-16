// dependências
import EventHandlerInterface from "../../../shared/event/eventHandlerInterface";
import ProductCreatedEvent from "../productCreatedEvent";

// classe handler para o event ProductCreated, implementa a eventHandler
// podem existir vários eventHandlers para um event
export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  //método que vai executar as ações após a ocorrência de um evento
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email because ${event.eventData.name} was created`);
  }
}
