import CustomInput from "../../components/customInput"
import CustomTable from "../../components/customTable"

import useSWR from "swr"
import { useState, useEffect } from 'react'
import { HomeIcon  } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'



export default function UpdateUser() {
    const router = useRouter()
    const {userID} = router.query
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const {data, error} = useSWR(userID ? `/api/user/${userID}` : null, fetcher)
    const {data: userExpenses, error: userExpensesError} = useSWR(userID ? `/api/user/${userID}/expenses` : null, fetcher)
    
    useEffect(() => {
        setFirstName(data?.FirstName)
        setLastName(data?.LastName)
    }, [data])

    if(!data || !userExpenses) return <div className='bg-black w-screen h-screen text-white flex justify-center items-center'>Loading....</div>


    const submitForm = (e) => {
        e.preventDefault()
        fetcher(userID ? `/api/user/${userID}` : null, {method:'PUT', body:JSON.stringify({FirstName:firstName, LastName:lastName})})
        router.push('/user')
    }
    console.log(userExpenses)
    const disableButton = firstName === '' || lastName === ''
    return(
        <div className='bg-black w-screen h-screen text-white items-start px-4 pt-12 relative'>
            <button className="static" onClick={() => router.push('/user')}><HomeIcon className='h-10 w-10' /></button>
            <form className="flex justify-around items-center p-4" onSubmit={submitForm}>
                <CustomInput fieldName="First Name" fieldType="text" placeHolder="Will" setVal={setFirstName} inputVal={firstName}/>
                <CustomInput fieldName="Last Name" fieldType="text" placeHolder="Smith" setVal={setLastName} inputVal={lastName}/>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md border border-transparent disabled:bg-slate-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:hover:bg-slate-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto self-end"
                    disabled={disableButton}
                >
                    Update user
                </button>
            </form>

            <CustomTable tableHeaders={['expense', 'description', 'cost']}>

            </CustomTable>
            
            <div className="text-white">
                
            </div>
        </div>
    )
}