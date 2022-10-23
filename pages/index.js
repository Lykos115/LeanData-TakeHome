import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()

  return (
    <div className='bg-black w-screen h-screen text-white flex justify-center'>
      <div className='flex flex-col justify-center items-center'>
        <h1>Company Main Page</h1>
        <div>
          <button className='p-4' onClick={() => router.push('/user')}>user</button>
          <button className='p-4' onClick={() => router.push('/expense')}>expense</button>
          <button className='p-4' onClick={() => router.push('/companyExpense')}>company</button>
        </div>

      </div>
    </div>
  )
}
