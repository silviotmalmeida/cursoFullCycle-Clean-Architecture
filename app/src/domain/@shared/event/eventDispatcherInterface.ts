//dependências
import EventHandlerInterface from "./eventHandlerInterface";
import EventInterface from "./eventInterface";

// interface com os métodos básicos a serem implementados em um eventDispatcher
// um eventDispatcher monitora os events e despacha as ações contidas nos eventHandlers
export default interface EventDispatcherInterface {
  register(eventName: string, eventHandler: EventHandlerInterface): void; // método para registro de um eventHandler
  unregister(eventName: string, eventHandler: EventHandlerInterface): void; // método para remoção de um eventHandler
  unregisterAll(): void; // método para remoção de todos os eventHandlers
  notify(event: EventInterface): void; // método que aciona todos os eventHandlers associados a um event
}
