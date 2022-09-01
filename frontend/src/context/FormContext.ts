/* eslint-disable @typescript-eslint/naming-convention */
import {createContext} from 'react';
import type {FormContextType} from '../types/types';

const FormContext = createContext<FormContextType>({} as FormContextType);

export default FormContext;
