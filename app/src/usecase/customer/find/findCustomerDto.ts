// definindo o input a ser recebido no usecase
export interface InputFindCustomerDto {
  id: string;
}

// definindo o output a ser enviado no usecase
export interface OutputFindCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}
