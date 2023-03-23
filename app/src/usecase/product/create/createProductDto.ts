// definindo o input a ser recebido no usecase
export interface InputCreateProductDto {
  name: string;
  price: number;
  type: string;
}

// definindo o output a ser enviado no usecase
export interface OutputCreateProductDto {
  id: string;
  name: string;
  price: number;
}
