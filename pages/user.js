import CustomInput from "../components/customInput"
import CustomTable from "../components/customTable"

import { useState } from 'react'
import useSWR, { useSWRConfig } from "swr"
import { HomeIcon  } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'


export default function User() {
//     When adding/editing a user
    //     First Name and Last Name should be standard input boxes
    //     All fields must be filled out before being able to save the user
    //     Multiple users can have the same name, but each user must still be considered unique

// Total Expenses column is a read-only column when displaying or editing a user
// When editing/deleting a user, data in the other 2 tables should be updated as well
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [cursor, setCursor] = useState(1)
    const {mutate} = useSWRConfig()
    const router = useRouter()

    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const {data, error} = useSWR(`/api/user/all`, fetcher, {refreshInterval: 1000})

    if(!data) return <div className='bg-black w-screen h-screen text-white flex justify-center items-center'>Loading....</div>

    const submitForm = (e) => {
        e.preventDefault()
        fetcher('/api/user/addUser', {method:'POST', body:JSON.stringify({FirstName:firstName, LastName:lastName})})
        setFirstName('')
        setLastName('')
    }

    const tableHeaders = ["First Name", "Last Name", "Total Expense"]
    const disableButton = firstName === '' || lastName === ''
    return(
        <div className='bg-black w-screen h-full text-white items-start px-4 pt-12 relative overflow-x-hidden'>
            <button className='static' onClick={() => router.push('/')}><HomeIcon className='h-10 w-10' /><div className="text-white">Main Page</div></button>
            <form className="flex justify-around items-center p-4" onSubmit={submitForm}>
                <CustomInput fieldName="First Name" fieldType="text" placeHolder="Will" setVal={setFirstName} inputVal={firstName}/>
                <CustomInput fieldName="Last Name" fieldType="text" placeHolder="Smith" setVal={setLastName} inputVal={lastName}/>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md border border-transparent disabled:bg-slate-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:hover:bg-slate-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto self-end"
                    disabled={disableButton}
                >
                    Add user
                </button>
            </form>
            <CustomTable tableHeaders={tableHeaders} headerStyle='text-center'>
                {
                    data.map(user => (
                        <tr key={user.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-white sm:pl-6 md:pl-0">{user.FirstName}</td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-white sm:pl-6 md:pl-0">{user.LastName}</td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-white sm:pl-6 md:pl-0">${user.TotalExpense}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6 md:pr-0 w-1/4">
                                <a href={`/user/${user.id}`} className="mx-4 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                                    Edit
                                </a>
                                <button 
                                    className="mx-4 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        fetcher(`/api/user/${user.id}`, {method:'DELETE'})
                                    }}
                                >
                                    Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </CustomTable>
        </div>
    )
}