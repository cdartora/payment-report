import React, {useState} from 'react';
import {Listbox} from '@headlessui/react';
import {CaretDown, DotsThreeVertical} from 'phosphor-react';
import type {Client} from '../types/types';
import ClientLi from './ClientLi';

type ListProps = {
	clients: Client[] | undefined;
	client: Client | undefined;
	changeClient: (value: Client) => void;
};

export default function ClientInput({clients, client, changeClient}: ListProps) {
	return (
		<Listbox value={client} onChange={changeClient}>
			<div className='relative mt-1 z-30'>
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

							<ClientLi key={client.id} client={client} />

						))
					}
				</Listbox.Options>
			</div>
		</Listbox>
	);
}
