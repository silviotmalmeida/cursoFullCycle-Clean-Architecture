// definindo o input a ser recebido no usecase
export interface InputFindProductDto {
  id: string;
}

// definindo o output a ser enviado no usecase
export interface OutputFindProductDto {
  id: string;
  name: string;
  price: number;
}
