
import React, { useContext, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { authContext } from '../context/auth/authContext';
import Link from 'next/link';
import { Dropzone } from '../components/Dropzone'
import { appContext } from '../context/app/appContext';
import { Alert } from '../components/Alert'

const Home = () => {
  const AuthContext = useContext(authContext);
  const { userAuthenticated } = AuthContext;

  const AppContext = useContext(appContext);
  const { fileMessage, url } = AppContext;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){ 
      userAuthenticated();
    }
  }, [])

  return (
    <Layout>
      <div className="md:w4/5 xl:w-3/5 mx-auto mn-32">
        {
          url ? (
            <>
              <p className="text-center text-2xl mt-10">
                <span className="font-bold text-blue-700 text-4xl uppercase">Tu url es: </span>
                {`${process.env.frontendURL}/link/${url}`}
              </p>
              <button
                type="button"
                className="bg-blue-500 hover:bg-gray-900 w-full p-2 mt-2 text-white uppercase font-bold cursor-pointer mt-10"
                onClick={()=>navigator.clipboard.writeText(`${process.env.frontendURL}/link/${url}`)}
						  > Copiar enlace</button>
            </>
          ): (
              <>
            {fileMessage && <Alert message={fileMessage} />}
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">

          <Dropzone />

          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
              Share files easy and private
            </h2>
            <p className="text-blue-500 leading-loose">
              <span className="text-blue-500 font-bold">React File-Send </span>
              it allow you to share files with end-to-end encryption,
              it allow you to share files with end-to-end encryption
              it allow you to share files with end-to-end encryption
              it allow you to share files with end-to-end encryption
              it allow you to share files with end-to-end encryption
              it allow you to share files with end-to-end encryption
            </p>

            <Link href="/createacount">
              <a className="text-blue-500 font-bold text-lg hover:text-blue-700"> 
                Create an account for more benefits
              </a>
            </Link>

          </div>
        </div>
      </>
      )
       }
    </div>
    </Layout >
  )
}

export default Home;