// dependências
import EventHandlerInterface from "../../../shared/event/eventHandlerInterface";
import CustomerAddressChangedEvent from "../customerAddressChangedEvent";

// classe handler para o event CustomerAddressChanged, implementa a eventHandler
// podem existir vários eventHandlers para um event
export default class SendConsoleLogHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  //método que vai executar as ações após a ocorrência de um evento
  handle(event: CustomerAddressChangedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para ${event.eventData.address}`
    );
  }
}
