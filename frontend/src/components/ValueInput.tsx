import type {ChangeEvent} from 'react';
import React from 'react';
import CreateAppointmentContext from '../context/CreateAppointmentContext';

type ValueInputProps = {
	value: number | undefined;
	changeValue: (value: ChangeEvent<HTMLInputElement>) => void;
};

export default function ValueInput({value, changeValue}: ValueInputProps) {
	return (
		<label
			className='w-2/3'
			htmlFor='value'
		>
			<input
				className='p-3 shadow border rounded-md font-normal focus:outline-none w-full'
				type='input'
				name='value'
				value={value}
				onChange={changeValue}
				id='value'
				placeholder='Valor da consulta'
			/>
		</label>
	);
}
