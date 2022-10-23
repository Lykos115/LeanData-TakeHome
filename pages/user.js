import CustomInput from "../components/customInput"
import CustomTable from "../components/customTable"

import { useState } from 'react'
import useSWR, { useSWRConfig } from "swr"

export default function User() {
//     When adding/editing a user
    //     First Name and Last Name should be standard input boxes
    //     All fields must be filled out before being able to save the user
    //     Multiple users can have the same name, but each user must still be considered unique

// Total Expenses column is a read-only column when displaying or editing a user
// When editing/deleting a user, data in the other 2 tables should be updated as well
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const {mutate} = useSWRConfig()

    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const {data, error} = useSWR('/api/user/all', fetcher)

    if(!data) return <div className='bg-black w-screen h-screen text-white flex justify-center items-center'>Loading....</div>
    // console.log({firstName, lastName})

    const submitForm = (e) => {
        e.preventDefault()
        const response = fetcher('/api/user/addUser', {method:'POST', body:JSON.stringify({FirstName:firstName, LastName:lastName})})
        setFirstName('')
        setLastName('')
        mutate('/api/user/all')
    }

    const tableHeaders = ["First Name", "Last Name", "Total Expense"]
    return(
        <div className='bg-black w-screen h-screen text-white overflow-x-hidden'>
            <div className="h-full">
                {/* ^might be useless */}
                <form className="flex justify-around items-center p-4" onSubmit={submitForm}>
                    <CustomInput fieldName="First Name" fieldType="text" placeHolder="Will" setVal={setFirstName} inputVal={firstName}/>
                    <CustomInput fieldName="Last Name" fieldType="text" placeHolder="Smith" setVal={setLastName} inputVal={lastName}/>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto self-end"
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
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6 md:pr-0">
                                    <a href="#" className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                                        Edit
                                    </a>
                                </td>
                            </tr>
                        ))
                    }
                </CustomTable>
            </div>
        </div>
    )
}