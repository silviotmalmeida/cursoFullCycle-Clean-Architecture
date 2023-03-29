// definindo o padrão de erros a serem inseridos na notification
export type NotificationErrorProps = {
  message: string;
  context: string;
};

// classe responsável pela notificação de erros
export default class Notification {
  // definindo os atributos
  private errors: NotificationErrorProps[] = [];

  // definindo o construtor vazio
  constructor() {}

  // método de inserção de erros
  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  // método de verificação de existência de erros
  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  // método de listagem dos erros
  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }

  // método de listagem dos erros concatenados e separados por vírgulas, além de filtrados por contexto
  messages(context?: string): string {
    let message = "";
    this.errors.forEach((error) => {
      if (context === undefined || error.context === context) {
        message += `${error.context}: ${error.message},`;
      }
    });
    return message;
  }
}
