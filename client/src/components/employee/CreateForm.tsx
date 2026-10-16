import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react"
import { ROLE, type CreateUserInterface } from "../../interfaces/UserInterface"
import axios from "axios"
import toast from "react-hot-toast"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { Plus } from "lucide-react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface CreateFormInterface {
	getData: () => Promise<void>
	setOpen: Dispatch<SetStateAction<boolean>>
}

export const CreateForm = ({ getData, setOpen }: CreateFormInterface) => {

	const [loading, setLoading] = useState<boolean>(false)
	const [data, setData] = useState<CreateUserInterface>({
		name: "",
		email: "",
		role: ROLE.EMPLOYEE
	})
	const [errors, setErrors] = useState<Record<string, string>>({})

	const items = Object.values(ROLE).map((role) => ({
		label: role,
		value: role,
	}));

	const resetForm = () => {
		setData({
			name: "",
			email: "",
			role: ROLE.EMPLOYEE
		})
		setErrors({})
	}

	const handleChange = (
		fieldOrEvent:
			| ChangeEvent<HTMLInputElement>
			| "role",
		selectedValue?: string
	) => {
		const name =
			typeof fieldOrEvent === "string"
				? fieldOrEvent
				: fieldOrEvent.target.name;

		const value =
			typeof fieldOrEvent === "string"
				? selectedValue!
				: fieldOrEvent.target.value;

		setData((prev) => ({
			...prev,
			[name]: value,
		}));

		setErrors((prev) => ({
			...prev,
			[name]: "",
		}));
	};

	const handleSubmit = async () => {
		try {
			setLoading(true)

			const response = await axios.post(`${import.meta.env.VITE_API_URL}/employee/create`, data)

			toast.success(response.data.message || 'User added successfully')

			resetForm()
			await getData()
			setOpen(false)

		} catch (error: any) {
			const responseData = error.response?.data

			if (Array.isArray(responseData?.errors)) {
				const fieldErrors: Record<string, string> = {}
				responseData.errors.forEach(
					(item: { field: string, message: string }) => {
						fieldErrors[item.field] = item.message
					}
				)
				setErrors(fieldErrors)
			} else {
				console.error("Error while creating user : ", error)
				toast.error("Error while creating user")
			}

		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="w-full space-y-4">

			<div className="space-y-1">
				<Label htmlFor="name">Name <span className="text-red-600">*</span></Label>
				<Input
					type="text"
					id="name"
					name="name"
					onChange={handleChange}
					value={data.name}
					placeholder="Enter Name"
					className="rounded-sm"
					required
				/>
				{errors.name && (
					<span className="text-sm text-red-600">{errors.name}</span>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="email">Email <span className="text-red-600">*</span></Label>
				<Input
					type="email"
					id="email"
					name="email"
					onChange={handleChange}
					value={data.email}
					placeholder="Enter Email"
					className="rounded-sm"
					required
				/>
				{errors.email && (
					<span className="text-sm text-red-600">{errors.email}</span>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="role">Role <span className="text-red-600">*</span></Label>
				<Select
					value={data.role}
					onValueChange={(value) => handleChange("role", value)}
				>
					<SelectTrigger id="role" className="w-45">
						<SelectValue placeholder="Select role" />
					</SelectTrigger>

					<SelectContent>
						<SelectGroup>
							{items.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				{errors.role && (
					<span className="text-sm text-red-600">{errors.role}</span>
				)}
			</div>

			<div className="flex items-center justify-center">
				<Button className="cursor-pointer" onClick={handleSubmit}>
					{loading ? (
						<span className="flex items-center justify-center gap-1"><Spinner /> Creating...</span>
					) : (
						<span className="flex items-center justify-center gap-1"><Plus /> Create</span>
					)}
				</Button>
			</div>
		</div>
	)
}