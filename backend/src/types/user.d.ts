export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  value: string;
  installments: number;
  isPaid: boolean;
}

export interface Client {
  id: string;
  name: string;
}