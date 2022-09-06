import {CheckCircle} from 'phosphor-react';
import type {ChangeEvent} from 'react';
import {useContext} from 'react';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {createClient} from '../services/api';
import type {Client} from '../types/types';
import {getToken} from '../utils/utils';
import CreateAppointmentContext from '../context/CreateAppointmentContext';

export default function AddClientInput() {
	const navigate = useNavigate();
	const {getClients} = useContext(CreateAppointmentContext);
	const [clientName, setClientName] = useState<string>('');

	function changeClientName(event: ChangeEvent<HTMLInputElement>) {
		setClientName(event.target.value);
	}

	async function handleCreate() {
		const token = getToken();

		if (token) {
			if (clientName !== '') {
				await createClient('/client', {name: clientName} as Client, token as string);
				await getClients(token as string);
				setClientName('');
			}
		} else {
			localStorage.setItem('user', '');
			navigate('/login');
		}
	}

	return (
		<div
			className='flex justify-between items-center first-letter:rounded-md px-3 py-2 w-full'
		>
			<label htmlFor='client-name' className='w-full'>
				<input
					className='border-b-2 border-b-emerald-700 w-full p-2 outline-none'
					placeholder='Adicionar novo cliente'
					onChange={changeClientName}
					type='text'
					value={clientName}
					id='client-name'
				/>
			</label>
			<CheckCircle
				size={30}
				className={clientName === '' ? 'text-emerald-700' : 'hover:text-emerald-700 text-emerald-700'}
				onClick={handleCreate}
				weight={clientName === '' ? 'regular' : 'fill'}
			/>
		</div>
	);
}
