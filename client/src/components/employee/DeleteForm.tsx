import { useState, type Dispatch, type SetStateAction } from "react"
import type { GetUserInterface } from "../../interfaces/UserInterface"
import toast from "react-hot-toast"
import axios from "axios"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { Trash2 } from "lucide-react"

interface DeleteFormInterface {
	data: GetUserInterface
	getData: () => Promise<void>
	setOpenDelete: Dispatch<SetStateAction<boolean>>
}

export const DeleteForm = ({ data, getData, setOpenDelete }: DeleteFormInterface) => {

	const [loading, setLoading] = useState<boolean>(false)

	const handleSubmit = async () => {
		try {
			setLoading(true)

			const response = await axios.delete(`${import.meta.env.VITE_API_URL}/employee/delete/${data.id}`)

			toast.success(response.data.message || 'User deleted successfully')

			await getData()
			setOpenDelete(false)

		} catch (error: any) {
			console.error("Error while creating user : ", error)
			toast.error("Error while creating user")

		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="">
			<p className="">Are you sure you want to delete User - {data.name}? This action is irreversible.</p>
			<div className="flex items-center justify-center">
				<Button className="cursor-pointer" onClick={handleSubmit}>
					{loading ? (
						<span className="flex items-center justify-center gap-1"><Spinner /> Deleting...</span>
					) : (
						<span className="flex items-center justify-center gap-1"><Trash2 /> Delete</span>
					)}
				</Button>
			</div>
		</div>
	)
}