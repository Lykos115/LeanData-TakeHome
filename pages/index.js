import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()

  return (
    <div className='bg-black w-screen h-screen text-white flex flex-col justify-center'>
      <h1 className='text-center mb-20'>Company Main Page</h1>
      <div className='flex flex-row justify-center items-center'>
          <a href='/user' className='border-2 border-white border-solid p-4 w-80 h-48 m-20'>
            <h1 className='text-center pb-4 text-2xl'>Users</h1>
            <div>
              <p>View Users Information and Users Expenses.</p>
              <p>Edit and Update Users Information.</p>
            </div>
          </a>
          <a href='/expense' className='border-2 border-white border-solid p-4 w-80 h-48 m-20'>
            <h1 className='text-center pb-4 text-2xl'>Expenses</h1>
            <div>
              <p>View Expense Information.</p>
              <p>Edit and Update Expense Information.</p>
            </div>
          </a>

          <a href='/companyExpense' className='border-2 border-white border-solid p-4 w-80 h-48 m-20'>
            <h1 className='text-center pb-4 text-2xl'>Company Expenses</h1>
            <div>
              <p>View Company Expenses by Category</p>
              <p>Updates when changes are made through the system.</p>
            </div>
          </a>

      </div>
    </div>
  )
}
