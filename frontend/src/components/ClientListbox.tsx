import React, {useState} from 'react';
import {Listbox} from '@headlessui/react';
import {CaretDown} from 'phosphor-react';
import type {Client} from '../types/types';

type ListProps = {
	clients: Client[] | undefined;
	client: Client | undefined;
	changeClient: (value: Client) => void;
};

export default function ClientListbox({clients, client, changeClient}: ListProps) {
	return (
		<Listbox value={client} onChange={changeClient}>
			<div className='relative mt-1'>
				<Listbox.Button
					className='rounded-md border bg-white shadow p-3 text-text flex justify-between w-full items-center'
				>

					{client?.name ? client.name : 'Cliente'}
					<CaretDown size={20} />

				</Listbox.Button>

				<Listbox.Options
					className='w-full max-w-md text-text p-2 absolute mt-2 bg-white overflow-auto cursor-pointer flex flex-col gap-2 shadow-md border'
				>
					{
						clients?.map((client: Client) => (

							<Listbox.Option
								className='hover:bg-gray-100 w-full px-3 py-2 rounded-md'
								key={client.id}
								value={client}
							>
								{client.name}
							</Listbox.Option>

						))
					}
				</Listbox.Options>
			</div>
		</Listbox>
	);
}
