import {DotsThreeVertical} from 'phosphor-react';
import type {ChangeEvent} from 'react';
import React, {useContext, useState} from 'react';
import CreateAppointmentContext from '../context/CreateAppointmentContext';
import type {Client, Payment} from '../types/types';
import AppointmentMenu from './AppointmentMenu';
import ClientInput from './ClientInput';
import EditAppointmentForm from './EditAppointmentForm';

type CardProps = {
	appointment: Payment;
};

export default function AppointmentCard({appointment}: CardProps) {
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	return (
		<div
			className='flex items-center w-full'
		>
			{
				isEditMode ? (
					<EditAppointmentForm />
				) : (
					<div
						className='w-full flex text-text justify-between bg-white border p-4 rounded-md mb-3 shadow max-w-md'>
						<div className='flex flex-col'>
							{

								<span className='font-semibold'>
									{appointment.client}
								</span>

							}
							<span>
          Total: R$ {appointment.total}
							</span>
						</div>
						<div className='flex flex-col items-end'>
							<div>
								{
									<span className='font-semibold'>
										R$ {appointment.payment}
									</span>
								}
							</div>
							<span>
								{appointment.progress}
							</span>
						</div>
					</div>

				)
			}
			<div className='relative cursor-pointer m-2 p-1 flex flex-col justify-center'>
				<AppointmentMenu
					appointment={appointment}
					isEditMode={isEditMode}
					setIsEditMode={setIsEditMode}
				/>
			</div>
		</div>
	);
}

