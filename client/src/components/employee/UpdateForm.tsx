import { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react"
import { ROLE, type GetUserInterface, type UpdateUserInterface } from "../../interfaces/UserInterface"
import axios from "axios"
import toast from "react-hot-toast"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { SquarePen } from "lucide-react"

interface UdpateFormInterface {
	data: GetUserInterface
	getData: () => Promise<void>
	setOpenUpdate: Dispatch<SetStateAction<boolean>>
}

export const UpdateForm = ({ data, getData, setOpenUpdate }: UdpateFormInterface) => {

	const [loading, setLoading] = useState<boolean>(false)
	const [formData, setFormData] = useState<UpdateUserInterface>({
		id: "",
		name: "",
		email: "",
		role: ROLE.EMPLOYEE,
		createdAt: new Date(),
		updatedAt: new Date()
	})
	const [errors, setErrors] = useState<Record<string, string>>({})

	const items = Object.values(ROLE).map((role) => ({
		label: role,
		value: role,
	}));

	useEffect(() => {
		setFormData({
			id: data.id,
			name: data.name,
			email: data.email,
			role: data.role,
			createdAt: data.createdAt,
			updatedAt: data.updatedAt
		})
	}, [data])

	const resetForm = () => {
		setFormData({
			id: "",
			name: "",
			email: "",
			role: ROLE.EMPLOYEE,
			createdAt: new Date(),
			updatedAt: new Date()
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

		setFormData((prev) => ({
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

			const response = await axios.put(`${import.meta.env.VITE_API_URL}/employee/update`, formData)

			toast.success(response.data.message || 'User updated successfully')

			resetForm()
			await getData()
			setOpenUpdate(false)

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
				console.error("Error while updating user : ", error)
				toast.error("Error while updating user")
			}

		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="w-full space-y-4 text-black">

			<div className="space-y-1">
				<Label htmlFor="name">Name</Label>
				<Input
					type="text"
					id="name"
					name="name"
					onChange={handleChange}
					value={formData.name}
					placeholder="Enter Name"
					className="rounded-sm"
					required
				/>
				{errors.name && (
					<span className="text-sm text-red-600">{errors.name}</span>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					id="email"
					name="email"
					onChange={handleChange}
					value={formData.email}
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
					value={formData.role}
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
						<span className="flex items-center justify-center gap-1"><Spinner /> Updating...</span>
					) : (
						<span className="flex items-center justify-center gap-1"><SquarePen /> Udpate</span>
					)}
				</Button>
			</div>
		</div>
	)
}