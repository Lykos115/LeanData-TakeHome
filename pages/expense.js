import CustomInput from "../components/customInput"
import CustomDropDown from "../components/customDropDown"
import CustomTable from "../components/customTable"

import useSWR, { useSWRConfig } from "swr"
import { useState, useEffect } from 'react'

export default function Expense() {
    // When adding/editing an expense
    //     Full Name should be a dropdown of users from the users table
    //     Category will be a dropdown with the following options: Food, Travel, Equipment
    //     Description will be a standard input box
    //     Cost will be a standard input box
    //     All fields must be filled out before being able to save the expense
    // Each expense should be displayed as a separate row in the table
    // When editing/deleting an expense, data in the other 2 tables should be updated as well
    const [cost, setCost] = useState()
    const [description, setDescription] = useState('')
    const [fullName, setFullName] = useState('')
    const [category, setCategory] = useState('')
    const {mutate} = useSWRConfig()

    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const categoryList = [
        {id: 1, category: "Food"},
        {id: 2, category: "Travel"},
        {id: 3, category: "Equipment"},
    ]

    // const expenses = [
    //     {id:1, FullName: "Francisco Herrera", Category: "Food", Description: "Team lunch", Cost:40.00}
    // ]

    const {data: people, error: peopleError} = useSWR('/api/user/all', fetcher)
    const {data: expenses, error: expensesError} = useSWR('/api/expense/allExpenses', fetcher)
    const tableHeaders = ["Full Name", "Category", "Description", "Cost"]
    if(!people) return <div className='bg-black w-screen h-screen text-white flex justify-center items-center'>Loading....</div>
    // console.log(expenses)
    const submitExpense = (e) => {
        e.preventDefault()
        const name = fullName.FirstName + ' ' + fullName.LastName
        const expenseCategory = category.category
        const postData = JSON.stringify({FullName: name, Category:expenseCategory, Description: description, Cost: cost})
        const response = fetcher('/api/expense/allExpenses', {method: 'POST', body:postData}).then(res => console.log(res))
    
        mutate('/api/expense/allEpenses')
        setCost(0)
        setFullName('')
        setCategory('')
        setDescription('')

    }
    return(
        <div className="w-screen h-screen text-white bg-black items-start p-4">
            <form className="flex w-full justify-around" onSubmit={submitExpense}>
                <CustomDropDown data={people} type="people" inputVal={fullName} setVal={setFullName}/>
                <CustomDropDown data={categoryList} type="category" inputVal={category} setVal={setCategory}/>
                <CustomInput fieldName="Description" fieldType="text" placeHolder="Description" setVal={setDescription} inputVal={description}/>
                <CustomInput fieldName="Cost" fieldType="number" placeHolder="$10" setVal={setCost} inputVal={cost}/>
                <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto self-end"
                    >
                        Add Expense
                </button>
            </form>
            <CustomTable tableHeaders={tableHeaders} headerStyle='text-left'>
            {
                expenses.map(expense => (
                    <tr key={expense.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-medium text-white sm:pl-6 md:pl-0">{expense.FullName}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-medium text-white sm:pl-6 md:pl-0">{expense.Category}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-medium text-white sm:pl-6 md:pl-0">{expense.Description}</td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-left font-medium text-white sm:pl-6 md:pl-0">${expense.Cost}</td>
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
    )




}