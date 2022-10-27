import Link from 'next/link'

export default function Home() {

  return (
    <div className='bg-black w-screen h-screen text-white flex flex-col justify-center'>
      <h1 className='text-center mb-20'>Company Main Page</h1>
      <div className='flex flex-row justify-center items-center'>
          <Link href='/user'>
            <div className='border-2 border-white border-solid p-4 w-80 h-48 m-20'>
              <h1 className='text-center pb-4 text-2xl'>Users</h1>
              <div>
                <p>View Users Information and Users Expenses.</p>
                <p>Edit and Update Users Information.</p>
              </div>
            </div>
          </Link>
          <Link href='/expense'>
            <div className='border-2 border-white border-solid p-4 w-80 h-48 m-20'>
              <h1 className='text-center pb-4 text-2xl'>Expenses</h1>
              <div>
                <p>View Expense Information.</p>
                <p>Edit and Update Expense Information.</p>
              </div>
            </div>
          </Link>

          <Link href='/companyExpense'>
            <div className='border-2 border-white border-solid p-4 w-80 h-48 m-20'>
              <h1 className='text-center pb-4 text-2xl'>Company Expenses</h1>
              <div>
                <p>View Company Expenses by Category</p>
                <p>Updates when changes are made through the system.</p>
              </div>
            </div>
          </Link>

      </div>
    </div>
  )
}
