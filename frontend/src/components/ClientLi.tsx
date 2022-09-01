import {Listbox, Menu} from '@headlessui/react';
import {DotsThreeVertical, NotePencil, TrashSimple} from 'phosphor-react';
import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router';
import FormContext from '../context/FormContext';
import AppointmentsContext from '../context/AppointmentsContext';
import {deleteClient} from '../services/api';
import type {Client} from '../types/types';
import {getToken} from '../utils/utils';

type ClientProps = {
	client: Client;
};

export default function ClientLi({client}: ClientProps) {
	const navigate = useNavigate();
	const {getClients} = useContext(FormContext);
	const {getAppointments} = useContext(AppointmentsContext);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);

	function logout() {
		localStorage.setItem('user', '');
		navigate('/login');
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
		<Listbox.Option
			className='hover:bg-gray-100 flex justify-between w-full px-3 py-2 rounded-md'
			value={client}
		>
			{client.name}

			<Menu>
				<Menu.Button>
					<DotsThreeVertical />
				</Menu.Button>
				<Menu.Items
					className='relative z-40 top-0 flex gap-2'
				>
					<Menu.Item>
						{({active}) => (
							<span
								className='hover:text-emerald-700'
							>
								<NotePencil size={20}/>
							</span>
						)}
					</Menu.Item>
					<Menu.Item>
						{({active}) => (
							<span
								className='hover:text-red-500'
								onClick={handleDelete}
							>
								<TrashSimple size={20} />
							</span>
						)}
					</Menu.Item>
				</Menu.Items>
			</Menu>
		</Listbox.Option>
	);
}
