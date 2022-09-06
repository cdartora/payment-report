import {Listbox} from '@headlessui/react';
import {CaretDown} from 'phosphor-react';
import React, {useContext} from 'react';
import CreateAppointmentContext from '../context/CreateAppointmentContext';

type InstallmentsInputProps = {
	changeInstallments: (number: number) => void;
	installments: number | undefined;
};

export default function InstallmentsInput({installments, changeInstallments}: InstallmentsInputProps) {
	return (
		<Listbox value={installments} onChange={changeInstallments}>
			<div className='relative w-1/3'>
				<Listbox.Button
					className='rounded-md border bg-white shadow p-3 text-text flex justify-between w-full items-center'
				>

					{installments ? installments : 'Parcelas'}
					<CaretDown size={20} />

				</Listbox.Button>

				<Listbox.Options
					className='w-full max-w-md text-text p-2 absolute mt-2 bg-white max-h-52 overflow-auto cursor-pointer flex flex-col gap-2 shadow-md border'
				>
					{
						[...Array(12).keys()].map((index: number) => (

							<Listbox.Option
								className='hover:bg-gray-100 w-full px-3 py-2 rounded-md'
								key={index + 1}
								value={index + 1}
							>
								{index + 1}
							</Listbox.Option>

						))
					}
				</Listbox.Options>
			</div>
		</Listbox>
	);
}
