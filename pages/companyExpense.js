import useSWR from 'swr'
import { useRouter } from 'next/router'
import { HomeIcon } from '@heroicons/react/20/solid'

export default function CompanyExpense() {
    // Table Columns: Category, Total ($)
    // This is a read-only table and will only display the total amount of expenses for each category

    const router = useRouter()
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const {data, error} = useSWR('/api/companyExpenses', fetcher, {refreshInterval: 10000})
    if(!data) return <div className='w-screen h-screen bg-black text-white flex justify-center items-center'>Loading...</div>


    return (
        <div className='bg-black flex flex-col items-center w-screen h-screen'>
            <h1 className='text-6xl font-medium text-white py-20'>Company Expenses</h1>
            <button className='absolute left-0 top-0 m-4 text-white' onClick={() => router.push('/')}><HomeIcon className='h-10 w-10' /><div className="text-white">Main Page</div></button>
            <div className='text-white flex items-center justify-center relative'>
                {
                    data.map((item, index) => (
                        <div key={index} className='flex flex-col justify-center items-center p-4'>
                            <h1 className='text-6xl font-bold p-16'>{item.Category}</h1>
                            <div className='text-4xl font-semibold'>${item._sum.Cost.toFixed(2)}</div>
                        </div>
                    ))
                }               

            </div>
        </div>
    )

}