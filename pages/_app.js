import '../styles/globals.css'
// import Head from "next/head"

function MyApp({ Component, pageProps }) {

  return <div className='w-screen h-screen bg-black'><Component {...pageProps} /></div>
  // (
  //   <>
  //     <Head>
  //         <script src="https://cdn.tailwindcss.com"></script>
  //     </Head>
  //     <div className='w-screen h-screen bg-black'><Component {...pageProps} /></div>
  //   </>
  // )
}

export default MyApp
