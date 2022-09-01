import type {ChangeEvent} from 'react';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {requestClients} from '../services/api';
import type {Client} from '../types/types';
import {getToken} from '../utils/utils';
import FormContext from './FormContext';

function AppointmentsProvider({children}: React.PropsWithChildren) {
	const navigate = useNavigate();
	const [clients, setClients] = useState<Client[] | undefined>();
	const [client, setClient] = useState<Client | undefined>();
	const [value, setValue] = useState<number | undefined>();
	const [installments, setInstallments] = useState<number | undefined>();

	function resetInputs() {
		setClient(undefined);
		setValue(0);
		setInstallments(undefined);
	}

	function changeClient(value: Client) {
		setClient(value);
	}

	function changeInstallments(value: number) {
		setInstallments(value);
	}

	function changeValue(event: ChangeEvent<HTMLInputElement>) {
		const price = Number(event.target.value);
		if (price || price === 0) {
			console.log('trocou');

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
		console.log();

		setClients(clients);
	}

	useEffect(() => {
		const token = getToken();

		if (token) {
			getClients(token as string).catch(err => {
				console.log(err);

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
		resetInputs,
		clients,
		setClients,
		value,
		installments,
		client,
		getClients,
	};

	return (
		<FormContext.Provider value={initialValue} >
			{children}
		</ FormContext.Provider>
	);
}

export default AppointmentsProvider;
