import { useState } from "react"
import { ROLE, type GetUserInterface } from "../../interfaces/UserInterface"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { SquarePen, Trash2, X } from "lucide-react"
import { UpdateForm } from "./UpdateForm"
import { DeleteForm } from "./DeleteForm"

interface ViewCardInterface {
	data: GetUserInterface,
	getData: () => Promise<void>
}

export const ViewCard = ({ data, getData }: ViewCardInterface) => {

	const [openUpdate, setOpenUpdate] = useState<boolean>(false)
	const [openDelete, setOpenDelete] = useState<boolean>(false)
	const [selectedUser, setSelectedUser] = useState<GetUserInterface>({
		id: "",
		name: "",
		email: "",
		role: ROLE.EMPLOYEE,
		createdAt: "",
		updatedAt: ""
	})

	return (
		<Card className="gap-2 w-100">
			<CardHeader>
				<CardTitle>Name : {data.name}</CardTitle>
				<CardDescription>Email Id : {data.email}</CardDescription>
				<CardAction className="flex items-center gap-2">

					<AlertDialog open={openUpdate} onOpenChange={setOpenUpdate}>
						<AlertDialogTrigger
							onClick={() => setSelectedUser(data)}
							className=""
						>
							<SquarePen size={30} className="border rounded-sm p-1.5 cursor-pointer" />
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle className='flex items-center justify-between w-full'>
									<h1 className="">Update User</h1>
									<AlertDialogCancel className="cursor-pointer"><X /></AlertDialogCancel>
								</AlertDialogTitle>
								<AlertDialogDescription>
									<UpdateForm data={selectedUser} getData={getData} setOpenUpdate={setOpenUpdate} />
								</AlertDialogDescription>
							</AlertDialogHeader>
						</AlertDialogContent>
					</AlertDialog>

					<AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
						<AlertDialogTrigger
							className=""
							onClick={() => setSelectedUser(data)}
						>
							<Trash2 size={30} className="border rounded-sm p-1.5 cursor-pointer" />
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle className='flex items-center justify-between w-full'>
									<h1 className="">Delete User</h1>
									<AlertDialogCancel className="cursor-pointer"><X /></AlertDialogCancel>
								</AlertDialogTitle>
								<AlertDialogDescription>
									<DeleteForm data={selectedUser} getData={getData} setOpenDelete={setOpenDelete} />
								</AlertDialogDescription>
							</AlertDialogHeader>
						</AlertDialogContent>
					</AlertDialog>
				</CardAction>
			</CardHeader>

		</Card>
	)
}