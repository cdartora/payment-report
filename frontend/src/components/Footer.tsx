import React from 'react';
import {Link} from 'react-router-dom';

export default function Footer() {
	return (
		<div className='text-text text-sm fixed bottom-2 flex gap-1 items-center justify-center w-full'>
      Feito com ♥ por
			<Link
				className='font-semibold text-emerald-700 hover:underline underline-offset-2'
				to='https://carlos-dartora.super.site/'
			>
        Carlos Dartora
			</Link>
		</div>
	);
}
