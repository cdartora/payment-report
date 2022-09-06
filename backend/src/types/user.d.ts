import { Request } from "express";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Appointment {
  id: string;
  clientId: string;
  value: number;
  installments: number;
  isPaid: boolean;
  createdAt: Date;
  userId: string;
}

export interface Client {
  id: string;
  name: string;
  userId: string;
}

export interface RequestWithUser extends Request {
  user?: User;
}