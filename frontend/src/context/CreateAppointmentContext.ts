/* eslint-disable @typescript-eslint/naming-convention */
import {createContext} from 'react';
import type {CreateAppointmentContextType} from '../types/types';

const CreateAppointmentContext = createContext<CreateAppointmentContextType>({} as CreateAppointmentContextType);

export default CreateAppointmentContext;
