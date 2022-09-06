/* eslint-disable @typescript-eslint/no-floating-promises */
import React, {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import AppointmentsContext from '../context/AppointmentsContext';
import {getUser} from '../utils/utils';
import Appointments from '../components/Appointments';
import CreateAppointmentBox from '../components/CreateAppointmentBox';
import Header from '../components/Header';
import Total from '../components/Total';
import CreateAppointmentContext from '../context/CreateAppointmentContext';
import type {UserLocalStorage} from '../types/types';

export default function Dashboard() {
	const {getAppointments} = useContext(AppointmentsContext);
	const {getClients} = useContext(CreateAppointmentContext);
	const navigate = useNavigate();

	useEffect(() => {
		const user = getUser() as UserLocalStorage;

		if (user) {
			getAppointments();
			getClients(user.token);
		} else {
			navigate('/login');
		}
	}, []);

	return (
		<div className='text-xl'>
			<Header />
			<Total />
			<CreateAppointmentBox />
			<Appointments />
		</div>

	);
}
