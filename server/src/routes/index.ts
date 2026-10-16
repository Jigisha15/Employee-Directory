import { Router } from "express";
import employeeRoutes from "./employee.routes"

const router = Router()

router.use("/employee", employeeRoutes)

export default router