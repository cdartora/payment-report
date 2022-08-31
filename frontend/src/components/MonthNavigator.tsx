import { ArrowCircleLeft, ArrowCircleRight } from 'phosphor-react'
import React, { useContext } from 'react'
import AppointmentsContext from '../context/AppointmentsContext'

export default function MonthNavigator() {
  const { previousMonth, nextMonth, actualMonth } = useContext(AppointmentsContext);

  return (
    <div className='flex items-center gap-2 justify-center mb-4'>
      <button type='button' onClick={previousMonth}>
        <ArrowCircleLeft weight="bold" width={28} height={28} color="white" />
      </button>
      <div className='justify-start bg-white px-8 py-1 rounded-sm'>
        <span className='text-emerald-700 font-semibold'>{actualMonth.string}</span>
      </div>
      <button type='button' onClick={nextMonth}>
        <ArrowCircleRight weight="bold" width={28} height={28} color="white" />
      </button>
    </div>
  )
}
