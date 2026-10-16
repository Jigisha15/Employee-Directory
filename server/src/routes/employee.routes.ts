import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from "../controllers/employee.controller";

const router = Router()

router.get("/get", getEmployees)
router.post("/create", createEmployee)
router.put("/update", updateEmployee)
router.delete("/delete/:id", deleteEmployee)

export default router