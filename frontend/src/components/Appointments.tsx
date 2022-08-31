import React, { useContext } from 'react'
import AppointmentsContext from '../context/AppointmentsContext'
import { Payment } from '../types/types';
import AppointmentCard from './AppointmentCard';

export default function Appointments() {
  const { appointments, actualMonth } = useContext(AppointmentsContext);

  return (
    <div className='flex justify-center z-[1] absolute mt-[500px] w-full px-8 text-sm lg:text-lg'>
      <div className='max-w-md w-full mb-56'>
        <div className='my-6'>
          <span className='font-semibold text-text'>Minhas consultas</span>
        </div>
        {
          appointments && appointments[actualMonth.string] ? (
            appointments[actualMonth.string].map((appointment: Payment, index: number) => (<AppointmentCard key={index} appointment={appointment} />))
          ) : (
            <div>
              <span className='text-text'>Nenhuma consulta neste mês</span>
            </div>
          )
        }
      </div>
    </div>
  )
}
