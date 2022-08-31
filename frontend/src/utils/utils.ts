import {useNavigate} from 'react-router-dom';
import type {UserLocalStorage} from '../types/types';

export function getUser(): UserLocalStorage | boolean {
	try {
		const user = JSON.parse(localStorage.getItem('user')!) as UserLocalStorage;
		return user;
	} catch (err: unknown) {
		return false;
	}
}

export function getToken(): string | boolean {
	try {
		const user = JSON.parse(localStorage.getItem('user')!) as UserLocalStorage;
		return user.token;
	} catch (err: unknown) {
		return false;
	}
}

export function logout() {
	const navigate = useNavigate();
	localStorage.setItem('user', JSON.stringify({}));
	navigate('/login');
}
