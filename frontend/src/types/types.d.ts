export type LoginBody = {
	email: string;
	password: string;
};

export type RegisterBody = {
	name: string;
	email: string;
	password: string;
};

export type Client = {
	id: string;
	name: string;
};

export type Appointment = {
	id: string;
	client: Client;
	value: number;
	installments: number;
	createdAt: string;
	isPaid: boolean;
};

export type AppointmentBody = {
	clientId: string | undefined;
	value: number;
	installments: number;
	isPaid: boolean;
};

export type Payment = {
	id: string;
	client: string;
	total: string;
	payment: string;
	progress: string;
};

export type Payments = Record<string, Payment[]>;

export type AppointmentContextType = {
	appointments?: Payments;
	getAppointments: () => Promise<void>;
	nextMonth: () => void;
	previousMonth: () => void;
	actualMonth: {date: Date; string: string};
};

export type FormContextType = {
	changeValue: (event: ChangeEvent<HTMLInputElement>) => void;
	validateCredentials: () => boolean;
	changeInstallments: (value: number) => void;
	changeClient: (value: Client) => void;
	resetInputs: () => void;
	clients: Client[] | undefined;
	setClients: (Clients: Client[]) => void;
	value: number | undefined;
	installments: number | undefined;
	client: Client | undefined;
	getClients: (token: string) => Promise<void>;
};

export type UserLocalStorage = {
	id: string;
	name: string;
	email: string;
	token: string;
};
