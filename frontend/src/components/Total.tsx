import { ArrowCircleLeft, ArrowCircleRight } from 'phosphor-react'
import React, { useContext } from 'react'
import AppointmentsContext from '../context/AppointmentsContext';
import { Payment } from '../types/types';
import MonthNavigator from './MonthNavigator'

export default function Total() {
  const { appointments, actualMonth } = useContext(AppointmentsContext);
  console.log(appointments, actualMonth);

  function calculateTotal() {
    if (appointments && appointments[actualMonth.string]) {
      const total = appointments[actualMonth.string].reduce((total: number, { payment }: Payment) => {
        return total + (+payment);
      }, 0)
      return total.toFixed(2);
    } else {
      return '0.00'
    }
  }

  return (
    <div className='flex flex-col items-center justify-center bg-emerald-700 w-full h-72 top-[65px] absolute'>
      <MonthNavigator />
      <div className='flex flex-col mb-24'>
        <span className='font-semibold text-white'>Total:</span>
        <span className='font-black text-white text-6xl'>R$ {calculateTotal()}</span>
      </div>
    </div>
  )
}
