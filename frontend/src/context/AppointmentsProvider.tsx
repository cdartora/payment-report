import React, {useEffect, useState} from 'react';
import {getToken} from '../utils/utils';
import {requestAppointments} from '../services/api';
import type {Appointment, Payment, Payments} from '../types/types';
import AppointmentsContext from './AppointmentsContext';
import {useNavigate} from 'react-router-dom';

function AppointmentsProvider({children}: React.PropsWithChildren) {
	const navigate = useNavigate();
	const [appointments, setAppointments] = useState<Payments>();
	const [
		actualMonth,
		setActualMonth,
	] = useState<{date: Date; string: string}>({date: new Date(), string: getMonthYear(new Date())});

	function nextMonth() {
		const nextMonth = addMonth(actualMonth?.date);
		setActualMonth({
			date: nextMonth,
			string: getMonthYear(nextMonth),
		});
	}

	function previousMonth() {
		const nextMonth = subtractMonth(actualMonth?.date);
		setActualMonth({
			date: nextMonth,
			string: getMonthYear(nextMonth),
		});
	}

	async function getAppointments() {
		const token = getToken();
		if (token) {
			const data = await requestAppointments('/appointment', token as string);
			readAppointments(data);
		} else {
			localStorage.setItem('user', '');
			navigate('/login');
		}
	}

	function parseAppointment(appointment: Appointment, installment: number): Payment {
		const client = appointment.client.name;
		const total = (Number(appointment.value)).toFixed(2);
		const payment = (Number(appointment.value) / appointment.installments).toFixed(2);
		const progress = `${installment}/${appointment.installments}`;
		return {id: appointment.id, client, payment, total, progress};
	}

	function getMonthYear(date: Date) {
		const month = date.getMonth() + 1;
		return `${month >= 10 ? month : `0${month}`}/${date.getFullYear()}`;
	}

	function setMonthYear(date: Date) {
		const month = date.getMonth() + 2;
		return `${month >= 10 ? month : `0${month}`}/${date.getFullYear()}`;
	}

	function addMonth(date: Date) {
		const nextMonth = date.getMonth() + 1;
		date.setMonth(nextMonth);
		return date;
	}

	function subtractMonth(date: Date) {
		const nextMonth = date.getMonth() - 1;
		date.setMonth(nextMonth);
		return date;
	}

	function readAppointments(appointments: Appointment[]) {
		const payments: Payments = {};

		appointments.forEach((appointment: Appointment) => {
			const date = new Date(appointment.createdAt);
			let monthYear = setMonthYear(date);
			const initialMonth = addMonth(date);

			if (!payments[monthYear]) {
				payments[monthYear] = [];
			}

			for (let installment = 1; installment <= appointment.installments; installment += 1) {
				const parsedAppointment = parseAppointment(appointment, installment);

				if (!payments[monthYear]) {
					payments[monthYear] = [];
				}

				payments[monthYear].push(parsedAppointment);

				monthYear = getMonthYear(addMonth(initialMonth));
			}
		});

		setAppointments(payments);
	}

	const initialValue = {appointments, getAppointments, nextMonth, previousMonth, actualMonth};

	return (
		<AppointmentsContext.Provider value={initialValue} >
			{children}
		</ AppointmentsContext.Provider>
	);
}

export default AppointmentsProvider;
