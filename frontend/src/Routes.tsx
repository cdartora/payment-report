import React from 'react';
import {
	Routes as Switch, Route, Navigate,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

export default function Routes() {
	return (
		<Switch>
			<Route path='/' element={<Navigate to='/login' />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/dashboard' element={<Dashboard />} />
		</Switch>
	);
}
