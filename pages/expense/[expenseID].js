import CustomInput from "../../components/customInput"
import CustomDropDown from '../../components/customDropDown'

import useSWR from "swr"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Listbox} from '@headlessui/react'
import { CheckIcon, HomeIcon  } from '@heroicons/react/20/solid'


export default function UpdateUser() {
    const router = useRouter()
    const {expenseID} = router.query
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState()

    const categoryList = [
        {id: 1, category: "Food"},
        {id: 2, category: "Travel"},
        {id: 3, category: "Equipment"},
    ]
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const {data, error} = useSWR(expenseID ? `/api/expense/${expenseID}` : null, fetcher)
    const {data: userExpense, error: useerExpenseError} = useSWR(data ? `/api/user/${data.userID}` : null, fetcher)

    
    useEffect(() => {
        setDescription(data?.Description)
        setCost(data?.Cost)
    }, [data])

    if(!data || !userExpense) return <div className='bg-black w-screen h-screen text-white flex justify-center items-center'>Loading....</div>


    const submitForm = (e) => {
        e.preventDefault()
        fetcher(expenseID ? `/api/expense/${expenseID}` : null, {method:'PUT', body:JSON.stringify({Category:category, Description:description, Cost: cost})})
        const newAmount = Number(userExpense.TotalExpense) - Number(data.Cost) + cost
        const updateUserExpenseData = JSON.stringify({Cost: newAmount, userID: data.userID})
        fetcher('/api/user/updateUser', {method:'PUT', body: updateUserExpenseData} )

        // router.pop()
        router.push('/expense')
    }

    const disableButton = category === '' || description === '' || !cost
    return(
        <div className='bg-black w-screen h-screen text-white items-start px-4 pt-12 relative'>
            <button className="static" onClick={() => router.push('/expense')}><HomeIcon className='h-10 w-10' /></button>
            <form className="flex justify-around items-center p-4" onSubmit={submitForm}>
                <div>{userExpense.FirstName + ' ' + userExpense.LastName}</div>
                <CustomDropDown inputVal={category} setVal={setCategory} placeHolder='Select Category'>
                    {categoryList.map((item) => (
                        <Listbox.Option
                        key={item.id}
                        className={({ active }) =>
                            classNames(
                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9'
                            )
                        }
                        value={item}
                        >
                        {({ category, active }) => (
                            <>
                            <span className={classNames(category ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                {item.category}
                            </span>

                            {category ? (
                                <span
                                className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                                >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                            ) : null}
                            </>
                        )}
                        </Listbox.Option>
                    ))}
                </CustomDropDown>

                <CustomInput fieldName="Description" fieldType="text" placeHolder="Description" setVal={setDescription} inputVal={description}/>
                <CustomInput fieldName="Cost" fieldType="number" placeHolder="Cost" setVal={setCost} inputVal={cost}/>
                <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md border border-transparent disabled:bg-slate-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:hover:bg-slate-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto self-end"
                    disabled={disableButton}
                >
                    Update user
                </button>
            </form>
        </div>
    )
}