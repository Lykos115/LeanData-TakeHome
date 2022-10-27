import CustomInput from "../../../components/customInput"
import CustomTable from "../../../components/customTable"
import CustomDropDown from "../../../components/customDropDown"
import { Listbox} from '@headlessui/react'

import useSWR from "swr"
import { useState, useEffect } from 'react'
import { HomeIcon  } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'



export default function UpdateUser() {
    const router = useRouter()
    const {userID} = router.query
    // const [firstName, setFirstName] = useState('')
    // const [lastName, setLastName] = useState('')
    // 

    const categoryList = [
        {id: 0, category: "All"},
        {id: 1, category: "Food"},
        {id: 2, category: "Travel"},
        {id: 3, category: "Equipment"},
    ]
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }
    const [category, setCategory] = useState(categoryList[0])
    const [sortVal, setSortVal] = useState(null)
    const dropDown = <CustomDropDown inputVal={category} setVal={setCategory} placeHolder='Select Category' customStyle="w-1/3 text-center">
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
    const costButton = <button onClick={() => setSortVal(currentVal => {
        if(currentVal === null) return true
        if(currentVal === true) return false
        return null
    })}>Cost</button>
        console.log(category)
    // 
    

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const {data, error} = useSWR(userID ? `/api/user/${userID}` : null, fetcher)
    const {data: userExpenses, error: userExpensesError} = useSWR(userID ? `/api/user/${userID}/expenses` : null, fetcher)
    
    // useEffect(() => {
    //     setFirstName(data?.FirstName)
    //     setLastName(data?.LastName)
    // }, [data])

    if(!data || !userExpenses) return <div className='bg-black w-screen h-screen text-white flex justify-center items-center'>Loading....</div>


    // const submitForm = (e) => {
    //     e.preventDefault()
    //     fetcher(userID ? `/api/user/${userID}` : null, {method:'PUT', body:JSON.stringify({FirstName:firstName, LastName:lastName})})
    //     router.push('/user')
    // }
    // console.log(sortVal)

    const filteredExpenses = [...userExpenses].filter(expense => expense.Category === category.category)
    const expenseView = category.category === 'All' ? userExpenses : filteredExpenses
    const sortExpenseArr = [...expenseView]

    const finalExpense = sortVal ? sortExpenseArr.sort((expenseOne, expenseTwo) => {
        if(expenseOne.Cost > expenseTwo.Cost) return -1
        if(expenseOne.Cost < expenseTwo.Cost) return 1
        return 0
    }) : sortExpenseArr.sort((expenseOne, expenseTwo) => {
        if(expenseOne.Cost > expenseTwo.Cost) return 1
        if(expenseOne.Cost < expenseTwo.Cost) return -1
        return 0
        
    })
    // console.log(finalExpense)
    // const disableButton = firstName === '' || lastName === ''
    return(
        <div className='bg-black w-screen h-screen text-white items-start px-4 pt-12 relative'>
            <button className="static" onClick={() => router.push('/user')}><HomeIcon className='h-10 w-10' /></button>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-6xl font-semibold pb-4">Expense Summary</h1>
                <div className="flex">
                    <h2 className="text-3xl">{data.FirstName + ' ' + data.LastName}</h2>
                </div>
            </div>
            <CustomTable tableHeaders={[dropDown, 'description', costButton]}>
                {sortVal === null ? 
                expenseView.map(expense => (
                    <tr key={expense.id} className="bg-black w-screen">
                        {/* <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-medium text-white sm:pl-6 md:pl-0">{expense.FullName}</td> */}
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-white sm:pl-6 md:pl-0">{expense.Category}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-white sm:pl-6 md:pl-0">{expense.Description}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-white sm:pl-6 md:pl-0">${expense.Cost}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6 md:pr-0">
                            <a href={`/expense/${expense.id}`} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                                Edit
                            </a>
                            <button 
                                className="mx-4 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                onClick={(e) => {
                                    e.preventDefault()
                                    // const totalExpense = people.filter(person => Number(person.id) === expense.userID)[0].TotalExpense
                                    const totalExpense = data.TotalExpense
                                    const newCost = totalExpense - parseFloat(expense.Cost)
                                    fetcher('/api/user/updateUser', {method:'PUT', body:JSON.stringify({Cost: newCost, userID: expense.userID})})
                                    fetcher(`/api/expense/${expense.id}`, {method:'DELETE'})
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>            
                ))
                :
                finalExpense.map(expense => (
                    <tr key={expense.id} className="bg-black w-screen">
                        {/* <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-medium text-white sm:pl-6 md:pl-0">{expense.FullName}</td> */}
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-white sm:pl-6 md:pl-0">{expense.Category}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-white sm:pl-6 md:pl-0">{expense.Description}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-white sm:pl-6 md:pl-0">${expense.Cost}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6 md:pr-0">
                            <a href={`/expense/${expense.id}`} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                                Edit
                            </a>
                            <button 
                                className="mx-4 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                onClick={(e) => {
                                    e.preventDefault()
                                    // const totalExpense = people.filter(person => Number(person.id) === expense.userID)[0].TotalExpense
                                    const totalExpense = data.TotalExpense
                                    const newCost = totalExpense - parseFloat(expense.Cost)
                                    fetcher('/api/user/updateUser', {method:'PUT', body:JSON.stringify({Cost: newCost, userID: expense.userID})})
                                    fetcher(`/api/expense/${expense.id}`, {method:'DELETE'})
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </CustomTable>
        </div>
    )
}