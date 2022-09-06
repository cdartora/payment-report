import React from 'react';
import type {ChangeEvent, PropsWithChildren} from 'react';
import {useEffect, useState} from 'react';
import {requestClients} from '../services/api';
import type {Client} from '../types/types';
import {getToken} from '../utils/utils';
import EditAppointmentContext from './EditAppointmentContext';
import {useNavigate} from 'react-router-dom';

export default function EditAppointmentProvider({children}: PropsWithChildren) {
	const navigate = useNavigate();
	const [clients, setClients] = useState<Client[] | undefined>();
	const [client, setClient] = useState<Client | undefined>();
	const [value, setValue] = useState<number | undefined>();
	const [installments, setInstallments] = useState<number | undefined>();

	function changeClient(value: Client) {
		setClient(value);
	}

	function changeInstallments(value: number) {
		setInstallments(value);
	}

	function changeValue(event: ChangeEvent<HTMLInputElement>) {
		const price = Number(event.target.value);
		if (price || price === 0) {
			setValue(price);
		}
	}

	function validateCredentials() {
		const errorCases = [
			!client,
			!installments,
			!value,
		];

		const isValid = errorCases.every((err: boolean) => !err);
		return isValid;
	}

	function logout() {
		localStorage.setItem('user', JSON.stringify({}));
		navigate('/login');
	}

	async function getClients(token: string) {
		const clients = await requestClients('/client', token);

		setClients(clients);
	}

	useEffect(() => {
		const token = getToken();

		if (token) {
			getClients(token as string).catch(err => {
				navigate('/login');
			});
		} else {
			logout();
		}
	}, []);

	const initialValue = {
		changeValue,
		validateCredentials,
		changeInstallments,
		changeClient,
		clients,
		setClients,
		value,
		installments,
		client,
		getClients,
	};

	return (
		<EditAppointmentContext.Provider value={initialValue}>
			{children}
		</EditAppointmentContext.Provider>
	);
}
