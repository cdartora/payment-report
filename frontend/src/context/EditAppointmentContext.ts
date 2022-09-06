/* eslint-disable @typescript-eslint/naming-convention */
import {createContext} from 'react';
import type {EditAppointmentContextType} from '../types/types';

const EditAppointmentContext = createContext<EditAppointmentContextType>({} as EditAppointmentContextType);

export default EditAppointmentContext;
