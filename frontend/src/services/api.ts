
/* eslint-disable */
import axios from 'axios';
import { Appointment, AppointmentBody, Client, LoginBody, RegisterBody, UserLocalStorage } from '../types/types';

const api = axios.create({
  baseURL: "http://localhost:3001"
});

export const requestLogin = async (endpoint: string, body: LoginBody): Promise<UserLocalStorage> => {
  const { data } = await api.post(endpoint, body);
  return data;
};

// export const loginValidate = async (endpoint: string, token: string) => {

// };

export const requestRegister = async (endpoint: string, body: RegisterBody) => {
  await api.post(endpoint, body);
};

export const requestClients = async (endpoint: string, token: string): Promise<Client[]> => {
  const { data } = await api.get(endpoint, { headers: { Authorization: token } });
  return data;
};

export const createClient = async (endpoint: string, body: Client, token: string) => {
  await api.post(endpoint, body, { headers: { Authorization: token } });
}

export const deleteClient = async (endpoint: string, token: string) => {
  await api.delete(endpoint, { headers: { Authorization: token } });
}

export const updateClient = async (endpoint: string, body: Client, token: string) => {
  await api.put(endpoint, body, { headers: { Authorization: token } });
}

export const requestAppointments = async (endpoint: string, token: string): Promise<Appointment[]> => {
  const { data } = await api.get(endpoint, { headers: { Authorization: token } });
  return data;
}

export const updateAppointments = async (endpoint: string, body: Appointment, token: string) => {
  await api.put(endpoint, body, { headers: { authorization: token } })
}

export const createAppointments = async (endpoint: string, body: AppointmentBody, token: string) => {
  await api.post(endpoint, body, { headers: { authorization: token } })
}

export const deleteAppointments = async (endpoint: string, id: string, token: string) => {
  await api.delete(`${endpoint}/${id}`, { headers: { authorization: token } })
}