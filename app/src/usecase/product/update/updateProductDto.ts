// definindo o input a ser recebido no usecase
export interface InputUpdateProductDto {
  id: string;
  name: string;
  price: number;
}

// definindo o output a ser enviado no usecase
export interface OutputUpdateProductDto {
  id: string;
  name: string;
  price: number;
}
