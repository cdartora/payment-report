import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import AppointmentsProvider from './context/AppointmentsProvider';
import FormProvider from './context/FormProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AppointmentsProvider>
				<FormProvider>
					<App />
				</FormProvider>
			</AppointmentsProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
