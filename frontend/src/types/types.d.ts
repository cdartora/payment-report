export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface Client {
  id: string;
  name: string;
}

export interface Appointment {
  id: string;
  client: Client;
  value: number;
  installments: number;
  createdAt: string;
  isPaid: boolean;
}

export interface AppointmentBody {
  clientId: string | null;
  value: number;
  installments: number;
  isPaid: boolean;
}

export interface Payment {
  id: string;
  client: string;
  total: string;
  payment: string;
  progress: string;
}

export interface Payments {
  [key: string]: Payment[]
}

export interface Context {
  appointments?: Payments;
  getAppointments: () => void;
  nextMonth: () => void;
  previousMonth: () => void;
  actualMonth: { date: Date, string: string };
}