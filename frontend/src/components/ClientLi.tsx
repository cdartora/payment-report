import {Dialog, Listbox, Menu} from '@headlessui/react';
import {CheckCircle, DotsThreeVertical, NotePencil, TrashSimple, XCircle} from 'phosphor-react';
import type {ChangeEvent, ReactEventHandler, RefObject} from 'react';
import React, {useContext, useRef, useState} from 'react';
import {useNavigate} from 'react-router';
import CreateAppointmentContext from '../context/CreateAppointmentContext';
import AppointmentsContext from '../context/AppointmentsContext';
import {deleteClient, updateClient} from '../services/api';
import type {Client} from '../types/types';
import {getToken} from '../utils/utils';

type ClientProps = {
	client: Client;
};

export default function ClientLi({client}: ClientProps) {
	const navigate = useNavigate();
	const {getClients} = useContext(CreateAppointmentContext);
	const {getAppointments} = useContext(AppointmentsContext);
	const [clientName, setClientName] = useState<string>('');
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	function logout() {
		localStorage.setItem('user', '');
		navigate('/login');
	}

	async function handleUpdate() {
		const token = getToken();
		if (token) {
			if (clientName !== '') {
				changeEditMode();
			}

			await updateClient(`/client/${client.id}`, {id: client.id, name: clientName}, token as string);
			await getClients(token as string);
			await getAppointments();
		} else {
			logout();
		}
	}

	function changeEditMode() {
		setIsEditMode(!isEditMode);
	}

	function changeClientName(event: ChangeEvent<HTMLInputElement>) {
		setClientName(event.target.value);
	}

	async function handleDelete() {
		const token = getToken();

		if (token) {
			try {
				await deleteClient(`client/${client.id}`, token as string);
				await getClients(token as string);
				await getAppointments();
			} catch (err: unknown) {
				console.log(err);
				logout();
			}
		} else {
			logout();
		}
	}

	return (
		<>
			<div className='flex justify-between hover:bg-gray-100 rounded-md px-3 py-2 w-full'>
				<Listbox.Option
					value={client}
					disabled={isEditMode}
				>
					{
						isEditMode ? (
							<label htmlFor='clientName'>
								<input
									className='bg-gray-100 focus:outline-none px-3'
									type='text'
									id='clientName'
									value={clientName}
									onChange={changeClientName}
									autoFocus
								/>
							</label>
						) : (
							<span>
								{client.name}
							</span>
						)
					}
				</Listbox.Option>
				{
					isEditMode ? (
						<div className='flex gap-2'>
							<XCircle size={20} className='hover:text-red-500' onClick={() => {
								setIsEditMode(false);
							}} />
							<CheckCircle
								size={20}
								className={clientName === '' ? 'text-emerald-700' : 'hover:text-emerald-700 text-emerald-700'}
								onClick={handleUpdate}
								weight={clientName === '' ? 'regular' : 'fill'}
							/>
						</div>
					) : (

						<Menu>
							<Menu.Button>
								{
									({open}) => (
										<DotsThreeVertical size={20} className={open ? 'hidden' : ''} />
									)
								}
							</Menu.Button>
							<Menu.Items
								className='relative z-40 top-0 flex gap-2'
							>

								<Menu.Item>
									<span
										className='hover:text-emerald-700'
										onClick={changeEditMode}
									>
										<NotePencil size={20}/>
									</span>
								</Menu.Item>
								<Menu.Item>
									<span
										className='hover:text-red-500'
										onClick={handleDelete}
									>
										<TrashSimple size={20} />
									</span>
								</Menu.Item>

							</Menu.Items>
						</Menu>
					)
				}
			</ div>
		</>
	);
}
