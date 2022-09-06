import React, {useContext} from 'react';
import type {ChangeEvent} from 'react';
import EditAppointmentContext from '../context/EditAppointmentContext';
import type {Client} from '../types/types';
import ClientInput from './ClientInput';
import InstallmentsInput from './IntallmentsInput';
import ValueInput from './ValueInput';
import CreateAppointmentContext from '../context/CreateAppointmentContext';

export default function EditAppointmentForm() {
	const {clients} = useContext(CreateAppointmentContext);
	const {
		client,
		changeClient,
		value,
		changeValue,
		installments,
		changeInstallments,
	} = useContext(EditAppointmentContext);

	return (
		<div
			className='w-full flex text-text items-center gap-2 bg-white border p-4 rounded-md mb-3 shadow max-w-md'
		>
			<ClientInput clients={clients} client={client} changeClient={changeClient} />
			<ValueInput value={value} changeValue={changeValue }/>
			<InstallmentsInput installments={installments} changeInstallments={changeInstallments} />
		</div>
	);
}
