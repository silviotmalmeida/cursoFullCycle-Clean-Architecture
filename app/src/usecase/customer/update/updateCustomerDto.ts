// definindo o input a ser recebido no usecase
export interface InputUpdateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}

// definindo o output a ser enviado no usecase
export interface OutputUpdateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  };
}
