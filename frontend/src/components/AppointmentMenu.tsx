import React, {useContext} from 'react';
import {Menu} from '@headlessui/react';
import {CheckCircle, DotsThreeVertical, NotePencil, TrashSimple, XCircle} from 'phosphor-react';
import {useNavigate} from 'react-router-dom';
import AppointmentsContext from '../context/AppointmentsContext';
import EditAppointmentContext from '../context/EditAppointmentContext';
import {deleteAppointments, updateAppointments} from '../services/api';
import type {Payment} from '../types/types';
import {getToken} from '../utils/utils';

type AppointmentMenuProps = {
	appointment: Payment;
	isEditMode: boolean;
	setIsEditMode: (value: boolean) => void;
};

export default function AppointmentMenu({appointment, isEditMode, setIsEditMode}: AppointmentMenuProps) {
	const navigate = useNavigate();
	const {getAppointments} = useContext(AppointmentsContext);
	const {validateCredentials, client, value, installments} = useContext(EditAppointmentContext);

	function logout() {
		localStorage.setItem('user', '');
		navigate('/login');
	}

	async function handleDelete() {
		const token = getToken();
		if (token) {
			try {
				await deleteAppointments(`appointment/${appointment.id}`, token as string);
				await getAppointments();
			} catch (err: unknown) {
				console.log(err);
				logout();
			}
		} else {
			logout();
		}
	}

	async function handleUpdate() {
		const token = getToken();
		if (token) {
			const body = {
				clientId: client?.id,
				value: value!,
				installments: installments!,
				isPaid: false,
			};
			await updateAppointments(`appointment/${appointment.id}`, body, token as string);
			await getAppointments();
			setIsEditMode(false);
		} else {
			logout();
		}
	}

	function changeEditMode() {
		setIsEditMode(!isEditMode);
	}

	return (
		<>
			{
				isEditMode ? (
					<div className='flex flex-col gap-2'>
						<XCircle size={25} className='hover:text-red-500' onClick={() => {
							setIsEditMode(false);
						}} />
						<CheckCircle
							size={25}
							className={validateCredentials() ? 'text-emerald-700' : 'hover:text-emerald-700 text-emerald-700'}
							onClick={handleUpdate}
							weight={validateCredentials() ? 'fill' : 'regular'}
						/>
					</div>
				) : (
					<Menu>
						<Menu.Button>
							{
								({open}) => {
									if (!open) {
										setIsEditMode(false);
									}

									return (
										<DotsThreeVertical size={30} className={open ? 'hidden' : 'hover:bg-gray-100 rounded-md'} />
									);
								}
							}
						</Menu.Button>
						<Menu.Items
							className='relative z-40 top-0 flex flex-col justify-center'
						>

							<Menu.Item>
								<span
									className='hover:text-emerald-700 p-1'
									onClick={changeEditMode}
								>
									<NotePencil size={25}/>
								</span>
							</Menu.Item>
							<Menu.Item>
								<span
									className='hover:text-red-500 p-1'
									onClick={handleDelete}
								>
									<TrashSimple size={25} />
								</span>
							</Menu.Item>

						</Menu.Items>
					</Menu>
				)
			}
		</>
	);
}
