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

export type Context = {
	appointments?: Payments;
	getAppointments: () => void;
	nextMonth: () => void;
	previousMonth: () => void;
	actualMonth: {date: Date; string: string};
};

export type UserLocalStorage = {
	id: string;
	name: string;
	email: string;
	token: string;
};
