import joi from "joi"
import { ROLE } from "../generated/prisma/enums"

export const createUserValidation = joi.object({
	name: joi.string().pattern(/^[^0-9]+$/).min(3).max(200).required(),
	email: joi.string().email().required(),
	role: joi.string().allow(...Object.values(ROLE)).required()
})

export const updateUserValidation = joi.object({
	id: joi.string().uuid().required(),
	name: joi.string().pattern(/^[^0-9]+$/).min(3).max(200).optional(),
	email: joi.string().email().optional(),
	role: joi.string().valid(...Object.values(ROLE)).optional(),
	createdAt: joi.date().iso().required(),
	updatedAt: joi.date().iso().required(),
})