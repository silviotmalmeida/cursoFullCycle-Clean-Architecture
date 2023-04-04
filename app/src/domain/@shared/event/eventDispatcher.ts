// dependências
import EventDispatcherInterface from "./eventDispatcherInterface";
import EventHandlerInterface from "./eventHandlerInterface";
import eventInterface from "./eventInterface";

// criando a classe que implementa o eventDispatcherInterface
// um eventDispatcher monitora os events e despacha as ações contidas nos eventHandlers registrados
export default class EventDispatcher implements EventDispatcherInterface {
  // criando array de eventHandlers registrados vazio
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  // método get dos eventHandlers registrados
  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  // método para registro de um eventHandler
  register(eventName: string, eventHandler: EventHandlerInterface): void {
    // se ainda não existir uma chave para o eventName, cria
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    // inclui o eventHandler no array da chave eventName
    this.eventHandlers[eventName].push(eventHandler);
  }

  // método para remoção de um eventHandler
  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    // se existir uma chave para o eventName
    if (this.eventHandlers[eventName]) {
      // localiza a posição do eventHandler a ser removido
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      // se o eventHandler existir, remove-o
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  // método para remoção de todos os eventHandlers
  unregisterAll(): void {
    this.eventHandlers = {};
  }

  // método que aciona todos os eventHandlers associados a um event
  notify(event: eventInterface): void {
    // obtendo o nome do event
    const eventName = event.constructor.name;

    // se existirem eventHandlers registrados associados ao event
    if (this.eventHandlers[eventName]) {
      // executa os métodos handle dos eventHandlers registrados associados ao event
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }
}
