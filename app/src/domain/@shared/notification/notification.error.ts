// dependências
import { NotificationErrorProps } from "./notification";

// criando o tipo de erro customizado para notificações
export default class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(
      errors.map((error) => `${error.context}: ${error.message}`).join(",")
    );
  }
}
