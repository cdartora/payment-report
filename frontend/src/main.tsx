import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import AppointmentsProvider from './context/AppointmentsProvider';
import CreateAppointmentProvider from './context/CreateAppointmentProvider';
import EditAppointmentProvider from './context/EditAppointmentProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AppointmentsProvider>
				<CreateAppointmentProvider>
					<EditAppointmentProvider>
						<App />
					</EditAppointmentProvider>
				</CreateAppointmentProvider>
			</AppointmentsProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
