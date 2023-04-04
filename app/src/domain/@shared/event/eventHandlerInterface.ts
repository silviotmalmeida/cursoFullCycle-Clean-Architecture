// dependências
import EventInterface from "./eventInterface";

// interface com os métodos básicos a serem implementados em um eventHandler
// podem existir vários eventHandlers para um event
export default interface EventHandlerInterface< T extends EventInterface = EventInterface > {
  //método que vai executar as ações após a ocorrência de um evento
  handle(event: T): void;
}
