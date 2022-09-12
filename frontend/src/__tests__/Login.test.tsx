import React from 'react';
import {beforeEach, describe, it, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import sinon from 'sinon';

import App from '../App';
import {api} from '../services/api';

describe('Testa se todos os elementos estão na tela', () => {
	test('Título', () => {
		render(<App />, {wrapper: BrowserRouter});

		const title = screen.getByText(/Entre para continuar/i);

		expect(title).toBeInTheDocument();
	});

	test('Inputs', () => {
		render(<App />, {wrapper: BrowserRouter});

		const emailInput = screen.getByPlaceholderText(/Email/i);
		const passwordInput = screen.getByPlaceholderText(/Password/i);

		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
	});

	test('Button', () => {
		render(<App />, {wrapper: BrowserRouter});

		const loginButton = screen.getByText(/Entrar/i);

		expect(loginButton).toBeInTheDocument();
		expect(loginButton).toBeDisabled();
	});

	test('Register navigation', () => {
		render(<App />, {wrapper: BrowserRouter});

		const registerButton = screen.getByText(/Cadastre-se/i);

		expect(registerButton).toBeInTheDocument();
	});
});

describe('Testa fluxo de Login', () => {
	describe('Testa validação de inputs', () => {
		test('Botão inicia a página desativado', () => {
			render(<App />, {wrapper: BrowserRouter});

			const loginButton = screen.getByText(/Entrar/i);

			expect(loginButton).toBeInTheDocument();
			expect(loginButton).toBeDisabled();
		});

		test('Botão apenas ativa quando inputs forem preenchidos', async () => {
			render(<App />, {wrapper: BrowserRouter});
			const user = userEvent.setup();

			const loginButton = screen.getByText(/Entrar/i);
			const emailInput = screen.getByPlaceholderText(/Email/i);
			const passwordInput = screen.getByPlaceholderText(/Password/i);

			expect(emailInput).toBeInTheDocument();
			expect(passwordInput).toBeInTheDocument();
			expect(loginButton).toBeDisabled();

			await user.type(emailInput, 'johndoe@gmail.com');
			expect(loginButton).toBeDisabled();
			await user.type(passwordInput, '1234567');
			expect(loginButton).toBeEnabled();
		});
	});
});
