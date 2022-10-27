import CustomInput from "../components/customInput"
import CustomDropDown from "../components/customDropDown"
import CustomTable from "../components/customTable"

import useSWR from "swr"
import { useState } from 'react'
import { Listbox} from '@headlessui/react'
import { CheckIcon, HomeIcon  } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'

export default function Expense() {
    const [cost, setCost] = useState()
    const [description, setDescription] = useState('')
    const [fullName, setFullName] = useState('')
    const [category, setCategory] = useState('')

    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }
    const router = useRouter()

    const categoryList = [
        {id: 1, category: "Food"},
        {id: 2, category: "Travel"},
        {id: 3, category: "Equipment"},
    ]

    const {data: people, error: peopleError} = useSWR('/api/user/all', fetcher)
    const {data: expenses, error: expensesError} = useSWR('/api/expense/allExpenses', fetcher, {refreshInterval: 1000})

    const tableHeaders = ["Full Name", "Category", "Description", "Cost"]

    if(!people || !expenses) return <div className='bg-black w-screen h-screen text-white flex justify-center items-center'>Loading....</div>

    const submitExpense = (e) => {
        e.preventDefault()

        const name = fullName?.FirstName + ' ' + fullName?.LastName
        const expenseCategory = category.category

        const postData = JSON.stringify({FullName: name, Category:expenseCategory, Description: description, Cost: cost, userID: fullName.id})
        const updateUserExpenseData = JSON.stringify({Cost: Number(cost) + Number(fullName.TotalExpense), userID: fullName.id})

        fetcher('/api/expense/addExpense', {method: 'POST', body:postData})
        fetcher('/api/user/updateUser', {method:'PUT', body: updateUserExpenseData} )


        setCost(0)
        setFullName('')
        setCategory('')
        setDescription('')

    }

    const disabledButton = (fullName === '' || description === '' || category === '' || !cost)

    return(
        <div className="w-screen h-screen text-white bg-black items-start px-4 pt-12 relative overflow-x-hidden">
            <button className='static' onClick={() => router.push('/')}><HomeIcon className='h-10 w-10' /><div className="text-white">Main Page</div></button>
            <form className="flex items-center justify-around" onSubmit={submitExpense}>
                <CustomDropDown inputVal={fullName} setVal={setFullName} placeHolder='Select Name'>
                    {people.map((item) => (
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
                        {({ fullName, active }) => (
                            <>
                            <span className={classNames(fullName ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                {item.FirstName + ' ' + item.LastName}
                            </span>

                            {fullName ? (
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
                <CustomInput fieldName="Cost" fieldType="number" placeHolder="$10" setVal={setCost} inputVal={cost}/>
                <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md border border-transparent disabled:bg-gray-600 bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:hover:bg-gray-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto self-end"
                        disabled={disabledButton}
                    >
                        Add Expense
                </button>
            </form>
            <CustomTable tableHeaders={tableHeaders} headerStyle='text-center'>
            {
                expenses.map(expense => (
                    <tr key={expense.id} className="bg-black w-screen">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-center font-medium text-white sm:pl-6 md:pl-0">{expense.FullName}</td>
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
                                    const totalExpense = people.filter(person => Number(person.id) === expense.userID)[0].TotalExpense
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
            }
            </CustomTable>

        </div>
    )




}
