import React from 'react';

export default function Footer() {
	return (
		<div className='text-text text-sm fixed bottom-0 p-2 flex gap-1 items-center justify-center w-full'>
      Feito com ♥ por
			<a
				className='font-semibold text-emerald-700 hover:underline underline-offset-2'
				href='https://carlos-dartora.super.site/'
			>
        Carlos Dartora
			</a>
		</div>
	);
}
