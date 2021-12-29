import React, { useContext, useState } from 'react'
import { Layout } from '../../components/Layout'
import { axiosClient } from '../../config/axios';

import { useRouter } from 'next/router'
import { appContext } from '../../context/app/appContext';
import { Alert } from '../../components/Alert';

const Link = ({ link }) => {
	const router = useRouter();
	const AppContext = useContext(appContext);
	const { cleanState, showAlert, fileMessage } = AppContext;

	const [hasPassword, setHasPassword] = useState(link.password)
	const [password, setPassword] = useState('') 
	const [fileLink, setFileLink] = useState(link.file)

	const onDownload = () => { 
		router.push(`${process.env.backendURL}/api/files/${fileLink}`);
		setTimeout(() => {
			cleanState();
			router.push('/');
		}, 2000);
	}

	const verifyPassword = async e =>{
		e.preventDefault();
		
		const data ={
			password
		}

		try { 
			const result = await axiosClient.post(`/api/links/${link.link}`, data) 
			setHasPassword(result.data.password);
			setFileLink(result.data.file) 
		} catch (error) {
			console.log(error.response.data.msg);
			showAlert(error.response.data.msg);
		}

		
	}

	return (
		<Layout>
			{
				hasPassword ? (
					<>
						<p className="text-center">This link has password, write it.</p>

						{fileMessage && <Alert message={fileMessage} />}

						<div className="flex justify-center mt-5">
							<div className="w-full max-w-lg">
								<form
									className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
									onSubmit={e=>verifyPassword(e)}
								>	
								<label className="block text-black text-sm font-bold mb-2"
									htmlFor="password">Password</label>
									<input
										type="password"
										className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus: outline-none focus:shadow-outline text-sm"
										id="password"
										placeholder="Password"
										value={password}
										onChange={e=>setPassword(e.target.value)}
									/>
									<input
										type="submit"
										className="bg-blue-500 hover:bg-gray-900 w-full p-2 mt-2 text-white uppercase font-bold cursor-pointer"
										value="Validate password"
									/>
								</form>
							</div>
						</div>

					</>
				) : (
					<>
						<h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
						<div className="flex items-center justify-center mt-10">
							<a onClick={onDownload} className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">
								Aqui
							</a>
						</div>
					</>
				)
			}


		</Layout>
	)
}


export async function getStaticProps({ params }) {
	const { link } = params; 
	const result = await axiosClient.get(`/api/links/${link}`);  

	return {
		props: {
			link: result.data
		},
		revalidate: 1
	}

}

export async function getStaticPaths(){
	const links = await axiosClient.get('/api/links'); 

	return{
		paths: links.data.links.map(link => ({
			params: { link: link.url}
		})),
		fallback:'blocking'
	}
}



export default Link;