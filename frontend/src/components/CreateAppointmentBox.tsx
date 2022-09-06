
import React, {useState} from 'react';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AppointmentsContext from '../context/AppointmentsContext';
import ClientInput from './ClientInput';

import {createAppointments} from '../services/api';
import {getToken} from '../utils/utils';
import CreateAppointmentContext from '../context/CreateAppointmentContext';
import ValueInput from './ValueInput';
import InstallmentsInput from './IntallmentsInput';

export default function CreateAppointmentBox() {
	const {getAppointments} = useContext(AppointmentsContext);
	const {
		validateCredentials,
		changeClient,
		resetInputs,
		changeValue,
		clients,
		client,
		installments,
		changeInstallments,
		value,
	} = useContext(CreateAppointmentContext);
	const navigate = useNavigate();
	const [created, setCreated] = useState<boolean>(false);

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
		await getAppointments();
		resetInputs();
		setCreated(true);
	}

	return (
		<>
			<div
				className='z-[2] absolute mt-64 w-full px-8 text-sm lg:text-lg'
			>
				<div className='bg-white flex flex-col gap-2 shadow-md rounded-md p-4 mx-auto max-w-md'>
					<span className='text-text font-semibold'>Adicionar consulta</span>

					<ClientInput clients={clients} client={client} changeClient={changeClient} />

					<div className='flex item-center justify-center gap-2'>
						<ValueInput value={value} changeValue={changeValue}/>

						<InstallmentsInput installments={installments} changeInstallments={changeInstallments} />
					</div>
					{
						created ? (
							<button
								className='border border-emerald-700 py-3 rounded-md text-emerald-700 font-normal'
								onClick={() => {
									setCreated(false);
								}}
							>
								Consulta criada!
							</button>
						) : (
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
						)
					}
				</div>
			</div>
		</>
	);
}
