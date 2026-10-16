import './App.css'
import axios from "axios"
import { useEffect, useState, type ChangeEvent } from 'react'
import toast from "react-hot-toast"
import type { GetUserInterface } from './interfaces/UserInterface'
import { Input } from './components/ui/input'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './components/ui/alert-dialog'
import { Plus, X } from 'lucide-react'
import { Card } from './components/ui/card'
import { Spinner } from './components/ui/spinner'
import { ViewCard } from './components/employee/ViewCard'
import { CreateForm } from './components/employee/CreateForm'

function App() {

  const [users, setUsers] = useState<GetUserInterface[]>([])
  const [query, setQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)


  const getData = async () => {
    try {

      setLoading(true)

      const response = await axios.get(`${import.meta.env.VITE_API_URL}/employee/get`, {
        params: {
          search: query
        }
      })

      setUsers(response.data.data)
      //toast.success(response.data.message || "Users fetched successfully") -- commenting this out because on every search it gives a toast

    } catch (error: any) {
      console.error("Error while fetching data : ", error)
      toast.error("Error while fetching data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [query])

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div className="w-[90%] rounded-sm mx-auto my-10 space-y-5">

      <h1 className="text-xl md:text-2xl font-semibold">Employee Directory</h1>

      <div className="w-full flex items-center justify-between gap-5">
        <Input
          id='query'
          name='query'
          value={query}
          onChange={handleQueryChange}
          placeholder='Search User by Name or Email Id'
          className='w-full rounded-sm'
        />

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger
            className="inline-flex items-center justify-center gap-1 border rounded-sm cursor-pointer px-5 py-1 hover:shadow-md"
          >
            <Plus size={18} />Create
          </AlertDialogTrigger>
          <AlertDialogContent className='w-full'>
            <AlertDialogHeader>
              <AlertDialogTitle className='flex items-center justify-between w-full'>
                <h1 className="">Create New User</h1>
                <AlertDialogCancel className="cursor-pointer"><X /></AlertDialogCancel>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <CreateForm getData={getData} setOpen={setOpen} />
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {loading ? (
        <Card className='w-full px-5 flex items-center justify-center gap-2'>
          <Spinner /> Loading...
        </Card>
      ) : !users.length ? (
        <Card className='w-full px-5 text-center'>
          No data present
        </Card>
      ) : (
        <div className="flex flex-wrap gap-5 items-center justify-center">
          {users.map((user: GetUserInterface) => (
            <ViewCard key={user.id} data={user} getData={getData} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
