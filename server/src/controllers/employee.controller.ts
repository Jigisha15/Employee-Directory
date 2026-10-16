import { Request, Response } from "express";
import prisma from "../prisma";
import { CreateUserInterface, UserInterface } from "../interfaces/employee.interface";
import { createUserValidation, updateUserValidation } from "../validations/employee.validation";
import { randomUUID } from "crypto";

// get all + search + pagination
export const getEmployees = async (req: Request, res: Response) => {
	try {

		const users = await prisma.user.findMany()

		const query = req.query.search?.toString().trim()

		if (!query) {
			return res.status(200).json({
				success: true,
				message: users.length ? "Data fetched successfully" : "No data present",
				data: users
			})
		}

		const searchWords = query.toLowerCase().split(/\s+/)

		const filteredResponse = users.filter((t: UserInterface) => {
			const name = t.name.toLowerCase()
			const email = t.email.toLowerCase()

			return searchWords.some((word: string) =>
				name.includes(word) || email.includes(word)
			)
		})

		return res.status(200).json({
			success: true,
			message: filteredResponse.length ? "Data fetched successfully" : "No data present",
			data: filteredResponse
		})

	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: "Internal server error"
		})
	}
}

// create
export const createEmployee = async (req: Request, res: Response) => {
	try {

		const { error, value } = createUserValidation.validate(req.body, {
			abortEarly: false
		})
		if (error) {
			if (error.isJoi) {
				return res.status(400).json({
					success: false,
					errors: error.details.map((detail: any) => ({
						field: detail.path.join("."),
						message: detail.message
					}))
				})
			}
			return res.status(400).json({
				success: false,
				message: "Invalid payload"
			})
		}

		const existingUser = await prisma.user.findFirst({
			where: {
				email: value.email
			}
		})

		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "User with the same email id already exists"
			})
		}

		const payload: CreateUserInterface = {
			name: value.name,
			email: value.email,
			role: value.role,
			createdAt: new Date(),
			updatedAt: new Date(),
		}

		const newUser = await prisma.user.create({
			data: payload
		})

		return res.status(201).json({
			success: true,
			message: "User created successfully",
			data: newUser
		})

	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: "Internal server error"
		})
	}
}

// create
export const updateEmployee = async (req: Request, res: Response) => {
	try {
		const { error, value } = updateUserValidation.validate(req.body, {
			abortEarly: false
		})
		if (error) {
			if (error.isJoi) {
				return res.status(400).json({
					success: false,
					errors: error.details.map((detail: any) => ({
						field: detail.path.join("."),
						message: detail.message
					}))
				})
			}
			return res.status(400).json({
				success: false,
				message: "Invalid payload"
			})
		}

		const existingUser = await prisma.user.findFirst({
			where: {
				id: value.id
			}
		})

		if (!existingUser) {
			return res.status(404).json({
				success: false,
				message: "User not found"
			})
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: value.id
			},
			data: value
		})

		return res.status(200).json({
			success: true,
			message: "User updated successfully",
			data: updatedUser
		})

	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: "Internal server error"
		})
	}
}


// create
export const deleteEmployee = async (req: Request, res: Response) => {
	try {

		const { id } = req.params
		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Parameter id is missing"
			})
		}

		const existingUser = await prisma.user.findFirst({
			where: {
				id: id as string
			}
		})

		if (!existingUser) {
			return res.status(404).json({
				success: false,
				message: "User not found"
			})
		}

		await prisma.user.delete({
			where: {
				id: id as string
			}
		})

		return res.status(200).json({
			success: true,
			message: "User deleted successfully"
		})

	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: "Internal server error"
		})
	}
}