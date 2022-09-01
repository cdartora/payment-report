
import React from 'react';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AppointmentsContext from '../context/AppointmentsContext';
import ClientInput from './ClientInput';

import {createAppointments} from '../services/api';
import {getToken} from '../utils/utils';
import FormContext from '../context/FormContext';
import ValueInput from './ValueInput';
import InstallmentsInput from './IntallmentsInput';

export default function CreateAppointmentBox() {
	const {getAppointments} = useContext(AppointmentsContext);
	const {
		validateCredentials,
		changeClient,
		resetInputs,
		clients,
		client,
		installments,
		value,
	} = useContext(FormContext);
	const navigate = useNavigate();

	console.log(validateCredentials);

	async function createAppointment() {
		const body = {
			clientId: client?.id,
			value: value!,
			installments: installments!,
			isPaid: false,
		};

		const token = getToken();

		if (!token) {
			localStorage.setItem('user', '');
			navigate('/login');
		}

		await createAppointments('/appointment', body, token as string);
		getAppointments();
		resetInputs();
	}

	return (
		<div
			className='z-[2] absolute mt-64 w-full px-8 text-sm lg:text-lg'
		>
			<div className='bg-white flex flex-col gap-2 shadow-md rounded-md p-4 mx-auto max-w-md'>
				<span className='text-text font-semibold'>Adicionar consulta</span>

				<ClientInput clients={clients} client={client} changeClient={changeClient} />

				<div className='flex item-center justify-center gap-2'>
					<ValueInput />

					<InstallmentsInput />
				</div>

				<button
					className={
						validateCredentials() ? 'bg-emerald-700 py-3 rounded-md text-white font-semibold hover:bg-emerald-600'
							: 'border border-emerald-700 py-3 rounded-md text-emerald-700 font-normal'
					}
					disabled={!validateCredentials()}
					onClick={createAppointment}
				>
          Confirmar
				</button>
			</div>
		</div>
	);
}
