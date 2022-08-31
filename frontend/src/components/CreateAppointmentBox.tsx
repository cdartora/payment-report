import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppointmentsContext from '../context/AppointmentsContext';
import ClientListbox from './ClientListbox';

import { createAppointments, requestClients } from '../services/api';
import { Client } from '../types/types'
import { getToken } from '../utils/utils';

export default function CreateAppointmentBox() {
  const { getAppointments } = useContext(AppointmentsContext);
  const [clients, setClients] = useState<Client[] | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [value, setValue] = useState<number | null>(null);
  const [installments, setInstallments] = useState<number | null>(null);
  const navigate = useNavigate();

  function changeClient(value: Client) {
    setClient(value);
  }

  function changeInstallments(event: ChangeEvent<HTMLSelectElement>) {
    setInstallments(Number(event.target.value));
  }

  function changeValue(event: ChangeEvent<HTMLInputElement>) {
    setValue(Number(event.target.value as string));
  }

  function validateCredentials() {
    const errorCases = [
      client == null,
      installments == null,
      installments !== installments,
      value !== value,
      value === 0,
    ];

    const isValid = errorCases.every((err: boolean) => err === false);
    return isValid;
  }

  function createAppointment() {
    const body = {
      clientId: client?.id as string,
      value: value as number,
      installments: installments as number,
      isPaid: false,
    }

    const token = getToken();

    createAppointments('/appointment', body, token);
    getAppointments();
  }

  function logout() {
    localStorage.setItem('user', JSON.stringify({}));
    navigate('/login')
  }

  async function getClients(token: string) {
    const clients = await requestClients('/client', token);
    setClients(clients);
  }

  useEffect(() => {
    const token = getToken();
    if (!token) {
      logout()
    } else {
      getClients(token);
    }
  }, [])

  return (
    <div
      className='z-[2] absolute mt-64 w-full px-8 text-sm lg:text-lg'
    >
      <div className='bg-white flex flex-col gap-2 shadow-md rounded-md p-4 mx-auto max-w-md'>
        <span className='text-text font-semibold'>Adicionar consulta</span>

        <ClientListbox clients={clients} client={client} changeClient={changeClient} />

        <div className='flex item-center justify-center gap-2'>
          <label
            className='w-2/3'
            htmlFor="value"
          >
            <input
              className='p-3 shadow border rounded-md font-normal focus:outline-none w-full'
              type="input"
              name="value"
              onChange={changeValue}
              id="value"
              placeholder="Valor da consulta"
            />
          </label>
          <label htmlFor="installments" className='w-1/3'>
            <select
              className='rounded-md border bg-white shadow p-3 text-text w-full'
              name="clients"
              onChange={changeInstallments}
              id="clients"
            >
              <option value="null">Parcelas</option>
              {
                [...Array(12).keys()].map((index: number) => (
                  <option key={index + 1} value={index + 1}>{index + 1}</option>
                ))
              }
            </select>
          </label>
        </div>

        <button
          className={
            !validateCredentials() ?
              'border border-emerald-700 py-3 rounded-md text-emerald-700 font-normal' :
              'bg-emerald-700 py-3 rounded-md text-white font-semibold hover:bg-emerald-600'
          }
          disabled={!validateCredentials()}
          onClick={createAppointment}
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}
