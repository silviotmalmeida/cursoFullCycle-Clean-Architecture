// interface com os dados básicos a serem implementados em um event
// um event pode conter vários eventHandlers
export default interface EventInterface {
  dataTimeOccurred: Date;
  eventData: any;
}
