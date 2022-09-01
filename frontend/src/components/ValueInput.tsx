import React, {useContext} from 'react';
import FormContext from '../context/FormContext';

export default function ValueInput() {
	const {changeValue, value} = useContext(FormContext);

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
