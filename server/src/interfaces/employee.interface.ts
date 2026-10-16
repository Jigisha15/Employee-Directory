import { ROLE } from "../generated/prisma/enums";

export interface UserInterface {
	id: string,
	name: string,
	email: string,
	role: ROLE,
	createdAt: Date | string,
	updatedAt: Date | string,
}

export interface CreateUserInterface {
	name: string,
	email: string,
	role: ROLE,
	createdAt: Date | string,
	updatedAt: Date | string,
}

//export enum ROLE {
//	ADMIN,
//	MANAGER,
//	EMPLOYEE
//}