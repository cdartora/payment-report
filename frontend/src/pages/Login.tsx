import type {ChangeEvent, FormEvent} from 'react';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {requestLogin} from '../services/api';
import {CircleNotch, WarningCircle} from 'phosphor-react';

export default function Login() {
	const [password, setPassword] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [loginError, setLoginError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	function handleEmailChange({target}: ChangeEvent<HTMLInputElement>) {
		setEmail(target.value);
	}

	function handlePasswordChange({target}: ChangeEvent<HTMLInputElement>) {
		setPassword(target.value);
	}

	function validateCredentials() {
		const emailRegex = /\S+@\S+\.\S+/;
		const isDisabled = emailRegex.test(email) && password?.length > 6;
		return !isDisabled;
	}

	async function submitLogin(event: FormEvent<HTMLButtonElement>) {
		event.preventDefault();
		const endpoint = '/login';
		try {
			setIsLoading(true);
			const user = await requestLogin(endpoint, {email, password});
			localStorage.setItem('user', JSON.stringify(user));
			navigate('/dashboard');
		} catch (err: unknown) {
			console.log(err);
			setLoginError(true);
			setIsLoading(false);
		}
	}

	return (
		<div className='h-screen p-10 flex flex-col items-center pt-36 text-xl max-w-lg mx-auto'>
			<div className='p-4 min-h-md h-96 bg-white rounded-lg'>
				<form className='flex flex-col h-full'>
					<span className='text-2xl font-extrabold text-zinc-700 mb-6'>
            Entre para continuar
					</span>

					<label htmlFor='email'>
						<input
							className='p-3 shadow-sm border rounded-md font-normal my-3 focus:outline-none'
							type='email'
							name='email'
							id='email'
							onChange={handleEmailChange}
							placeholder='Email'
						/>
					</label>

					<label htmlFor='password'>
						<input
							className='p-3 shadow-sm border rounded-md font-normal my-3 focus:outline-none'
							type='password'
							name='password'
							id='password'
							onChange={handlePasswordChange}
							placeholder='Password'
						/>
					</label>

					<div
						className='justify-center items-center text-red-500'
						style={{display: loginError ? 'flex' : 'none'}}
					>
						<WarningCircle />
						<span
							className='text-center text-[15px] ml-1'
						>
              Email ou senha inválidos
						</span>
					</div>
					{
						isLoading ? (
							<button
								className='bg-emerald-700 py-3 my-3 rounded-md text-white font-normal hover:bg-emerald-600 flex justify-center'
								type='submit'
								disabled
							>
								<CircleNotch height={28} className='animate-spin' weight='bold' />
							</button>
						) : (
							<button
								className={
									validateCredentials()
										? 'border border-emerald-700 py-3 my-3 rounded-md text-emerald-700 font-normal'
										: 'bg-emerald-700 py-3 my-3 rounded-md text-white font-normal hover:bg-emerald-600'
								}
								type='submit'
								onClick={submitLogin}
								disabled={validateCredentials()}
							>
                Entrar
							</button>
						)
					}
					<div className='flex justify-center gap-1 text-[0.8em] justify-self-end text-zinc-700'>
						<span>Não possuí uma conta?</span>
						<button
							className='text-emerald-700 font-semibold hover:underline underline-offset-1'
							type='button'
							onClick={() => {
								navigate('/register', {replace: true});
							}}
						>
              Cadastre-se
						</button>
					</div>
				</form>
			</div>
		</div >
	);
}
