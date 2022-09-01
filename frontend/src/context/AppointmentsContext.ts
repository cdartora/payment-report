/* eslint-disable @typescript-eslint/naming-convention */
import {createContext} from 'react';
import type {AppointmentContextType} from '../types/types';

const AppointmentsContext = createContext<AppointmentContextType>({} as AppointmentContextType);

export default AppointmentsContext;
