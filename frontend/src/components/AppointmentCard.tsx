import React from 'react'
import { Payment } from '../types/types'

interface CardProps {
  appointment: Payment;
}

export default function AppointmentCard({ appointment }: CardProps) {
  return (
    <div className='w-full flex text-text justify-between bg-white border p-4 rounded-md mb-3 shadow max-w-md'>
      <div className='flex flex-col'>
        <span className='font-semibold'>
          {appointment.client}
        </span>
        <span>
          Total: R$ {appointment.total}
        </span>
      </div>
      <div className='flex flex-col items-end'>
        <div>
          <span className='font-semibold'>
            R$ {appointment.payment}
          </span>
        </div>
        <span>
          {appointment.progress}
        </span>
      </div>
    </div>
  )
}
