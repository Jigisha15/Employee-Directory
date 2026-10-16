export interface GetUserInterface {
	id: string,
	name: string,
	email: string,
	role: ROLE,
	createdAt: Date | string,
	updatedAt: Date | string
}

export interface CreateUserInterface {
	name: string,
	email: string,
	role: ROLE,
}

export interface UpdateUserInterface {
	id: string,
	name: string,
	email: string,
	role: ROLE,
	createdAt: Date | string,
	updatedAt: Date | string
}

export const ROLE = {
	ADMIN: "ADMIN",
	MANAGER: "MANAGER",
	EMPLOYEE: "EMPLOYEE",
} as const;

export type ROLE = (typeof ROLE)[keyof typeof ROLE];